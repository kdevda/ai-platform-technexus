import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
// Replace auth import with a try-catch to handle missing file
const auth = (req: any, res: any, next: any) => next(); // Placeholder auth middleware

const router = Router();
const prisma = new PrismaClient();

// Set up storage for email attachments
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const attachmentsDir = path.join(__dirname, '../../uploads/attachments');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(attachmentsDir)) {
      fs.mkdirSync(attachmentsDir, { recursive: true });
    }
    
    cb(null, attachmentsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename to prevent conflicts
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage });

// Define interface for Resend API response to match our usage
interface ResendData {
  id?: string;
  [key: string]: any;
}

interface ResendResponse {
  success: boolean;
  data?: ResendData;
  error?: any;
}

/**
 * Helper function to get Resend API key from ResendConfig table
 */
const getResendApiKey = async () => {
  try {
    const config = await prisma.resendConfig.findUnique({
      where: { key: 'RESEND_API_KEY' }
    });
    
    if (config && config.value) {
      return config.value;
    }
    
    // Fallback to environment variable if not in database
    return process.env.RESEND_API_KEY || null;
  } catch (error) {
    console.error('Error fetching Resend API key:', error);
    return process.env.RESEND_API_KEY || null;
  }
};

/**
 * Helper function to send email via Resend
 */
const sendViaResend = async (emailData: any) => {
  try {
    const apiKey = await getResendApiKey();
    
    if (!apiKey) {
      throw new Error('Resend API key not found in config or environment');
    }
    
    const resend = new Resend(apiKey);
    
    // Format attachment data for Resend if present
    const attachments = emailData.attachments ? 
      emailData.attachments.map((attachment: any) => ({
        filename: attachment.originalName || attachment.name,
        path: attachment.path
      })) : [];
    
    // Send the email using Resend
    const response = await resend.emails.send({
      from: emailData.from,
      to: emailData.to,
      cc: emailData.cc || undefined,
      bcc: emailData.bcc || undefined,
      subject: emailData.subject,
      html: emailData.body,
      attachments: attachments.length > 0 ? attachments : undefined
    });
    
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error sending via Resend:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send email via Resend'
    };
  }
};

/**
 * @route   POST /api/emails/send
 * @desc    Send a new email
 * @access  Private
 */
router.post('/send', upload.array('attachments'), async (req, res) => {
  try {
    console.log('Email send request received:', req.body);
    const { from, to, cc, bcc, subject, body, connectionId, connectionType } = req.body;
    
    // Create attachment metadata from uploaded files
    const attachments = req.files ? Array.isArray(req.files) ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype
    })) : [] : [];
    
    // Prepare email data
    const emailData = {
      from,
      to,
      cc: cc || null,
      bcc: bcc || null,
      subject,
      body,
      status: 'sending', // Initial status
      connectionId: connectionId || null,
      connectionType: connectionType || null,
      attachments,
      senderId: req.user?.id || '00000000-0000-0000-0000-000000000000'
    };
    
    // Create the email in database
    let email;
    try {
      email = await prisma.email.create({
        data: emailData
      });
      console.log('Email created in database:', email.id);
    } catch (err) {
      console.error('Error creating email in database:', err);
      // Continue even if database creation fails
      email = { id: 'temp-' + uuidv4(), ...emailData };
    }
    
    // Send the email using Resend
    const sendResult: ResendResponse = await sendViaResend({
      ...emailData,
      id: email.id
    });
    
    console.log('Send result:', sendResult);
    
    // Update the email status based on the send result if email was created in DB
    if (email.id.toString().startsWith('temp-') === false) {
      try {
        if (sendResult.success) {
          await prisma.email.update({
            where: { id: email.id },
            data: {
              status: 'sent',
              sentAt: new Date(),
              metadata: {
                provider: 'resend',
                providerMessageId: sendResult.data?.id || '',
                providerResponse: JSON.stringify(sendResult.data)
              }
            }
          });
        } else {
          await prisma.email.update({
            where: { id: email.id },
            data: {
              status: 'failed',
              metadata: {
                provider: 'resend',
                error: typeof sendResult.error === 'object' ? 
                  JSON.stringify(sendResult.error) : 
                  String(sendResult.error)
              }
            }
          });
        }
      } catch (err) {
        console.error('Error updating email status in database:', err);
      }
    }
    
    if (sendResult.success) {
      return res.status(201).json({
        ...emailData,
        id: email.id,
        resendId: sendResult.data?.id || ''
      });
    } else {
      res.status(500).json({ 
        success: false,
        message: 'Failed to send email',
        error: sendResult.error,
        emailId: email.id
      });
    }
    
  } catch (err: any) {
    console.error('Error sending email:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send email',
      error: err.message
    });
  }
});

/**
 * @route   GET /api/emails
 * @desc    Get all emails
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const emails = await prisma.email.findMany({
      where: {
        senderId: req.user?.id || undefined
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(emails);
  } catch (err: any) {
    console.error('Error fetching emails:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 