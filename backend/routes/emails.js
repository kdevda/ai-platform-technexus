const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { Resend } = require('resend');
const { getResendApiKey } = require('../utils/resendUtils');

const prisma = new PrismaClient();

// Set up storage for email attachments
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const attachmentsDir = path.join(__dirname, '../uploads/attachments');
    
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

/**
 * Helper function to send email via Resend
 */
const sendViaResend = async (emailData) => {
  try {
    const apiKey = await getResendApiKey();
    
    if (!apiKey) {
      throw new Error('Resend API key not found in config or environment');
    }
    
    const resend = new Resend(apiKey);
    
    // Format attachment data for Resend if present
    const attachments = emailData.attachments ? 
      emailData.attachments.map(attachment => ({
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
  } catch (error) {
    console.error('Error sending via Resend:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send email via Resend'
    };
  }
};

/**
 * @route   GET /api/emails
 * @desc    Get all emails for the current user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const emails = await prisma.email.findMany({
      where: {
        senderId: req.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(emails);
  } catch (err) {
    console.error('Error fetching emails:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/emails/connection/:type/:id
 * @desc    Get emails related to a specific connection (loan, application, etc.)
 * @access  Private
 */
router.get('/connection/:type/:id', auth, async (req, res) => {
  try {
    const { type, id } = req.params;
    
    const emails = await prisma.email.findMany({
      where: {
        connectionType: type,
        connectionId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(emails);
  } catch (err) {
    console.error('Error fetching connection emails:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/emails/send
 * @desc    Send a new email
 * @access  Private
 */
router.post('/send', [auth, upload.array('attachments')], async (req, res) => {
  try {
    const { from, to, cc, bcc, subject, body, connectionId, connectionType } = req.body;
    
    // Create attachment metadata from uploaded files
    const attachments = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype
    }));
    
    // Prepare email data for database
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
      senderId: req.user.id
    };
    
    // Create the email in database
    const email = await prisma.email.create({
      data: emailData
    });
    
    // Send the email using Resend
    const sendResult = await sendViaResend({
      ...emailData,
      id: email.id
    });
    
    // Update the email status based on the send result
    if (sendResult.success) {
      await prisma.email.update({
        where: { id: email.id },
        data: {
          status: 'sent',
          sentAt: new Date(),
          metadata: {
            provider: 'resend',
            providerMessageId: sendResult.data?.id,
            providerResponse: sendResult.data
          }
        }
      });
      
      res.status(201).json({ 
        success: true,
        message: 'Email sent successfully',
        data: {
          ...email,
          resendId: sendResult.data?.id
        }
      });
    } else {
      await prisma.email.update({
        where: { id: email.id },
        data: {
          status: 'failed',
          metadata: {
            provider: 'resend',
            error: sendResult.error
          }
        }
      });
      
      res.status(500).json({ 
        success: false,
        message: 'Failed to send email',
        error: sendResult.error,
        emailId: email.id
      });
    }
  } catch (err) {
    console.error('Error sending email:', err.message);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send email',
      error: err.message
    });
  }
});

/**
 * @route   POST /api/emails/draft
 * @desc    Save an email as draft
 * @access  Private
 */
router.post('/draft', auth, async (req, res) => {
  try {
    const { from, to, cc, bcc, subject, body, connectionId, connectionType } = req.body;
    
    const email = await prisma.email.create({
      data: {
        from,
        to,
        cc: cc || null,
        bcc: bcc || null,
        subject,
        body,
        status: 'draft',
        connectionId: connectionId || null,
        connectionType: connectionType || null,
        senderId: req.user.id
      }
    });
    
    res.status(201).json({ 
      success: true,
      message: 'Draft saved successfully',
      data: email
    });
  } catch (err) {
    console.error('Error saving draft:', err.message);
    res.status(500).json({ 
      success: false,
      message: 'Failed to save draft',
      error: err.message 
    });
  }
});

/**
 * @route   PUT /api/emails/:id
 * @desc    Update an email
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the email
    const email = await prisma.email.findUnique({
      where: {
        id,
        senderId: req.user.id
      }
    });
    
    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }
    
    // Update the fields
    const updatedEmail = await prisma.email.update({
      where: { id },
      data: req.body
    });
    
    res.json({
      success: true,
      message: 'Email updated successfully',
      data: updatedEmail
    });
  } catch (err) {
    console.error('Error updating email:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/emails/:id
 * @desc    Delete an email
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the email and ensure it belongs to the current user
    const email = await prisma.email.findUnique({
      where: {
        id,
        senderId: req.user.id
      }
    });
    
    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }
    
    // Delete the email
    await prisma.email.delete({
      where: { id }
    });
    
    res.json({ message: 'Email deleted successfully' });
  } catch (err) {
    console.error('Error deleting email:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 