import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { PrismaClient, Prisma } from '@prisma/client';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore - Importing from utils directly, TypeScript will use the declaration file
import { 
  getResendApiKey, 
  getFormattedFromField
} from '../../utils/resendUtils';
import fs from 'fs';
import path from 'path';
import { CreateEmailOptions, CreateEmailResponse } from 'resend';

// Define interface for Request with files property from Express.Multer
interface RequestWithFiles extends Request {
  files?: Express.Multer.File[];
}

// Define type for successful Resend response
type ResendSuccessResponse = {
  id: string;
  from: string;
  to: string[];
  created_at: string;
};

// Define EmailData interface to match Prisma schema
interface EmailData {
  from: string;
  to: string;
  subject: string;
  textBody?: string;
  htmlBody?: string;
  body: string;  // Make body required to match Prisma schema
  status: string;
  metadata: any;
  cc?: string;
  bcc?: string;
  senderId?: string;
}

interface ResendErrorResponse {
  name: string;
  message: string;
}

const prisma = new PrismaClient();

/**
 * @desc    Send a contact email using Resend
 * @route   POST /api/email/send
 * @access  Public
 */
export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }
    
    // Get API key from database or environment
    const resendApiKey = await getResendApiKey();
    
    if (!resendApiKey) {
      console.error('No Resend API key found in database or environment');
      return res.status(500).json({
        success: false,
        error: 'Email service not configured properly'
      });
    }
    
    // Create Resend client
    const resend = new Resend(resendApiKey);
    
    // Get sender from environment or database
    let fromField;
    try {
      fromField = await getFormattedFromField();
    } catch (error) {
      console.error('Error getting formatted from field:', error);
      fromField = process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com';
    }
    
    // Format subject
    const formattedSubject = subject || `Contact form submission from ${name}`;
    
    // Create simple HTML email
    const html = `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div>${message}</div>
    `;
    
    // Send email
    const sendResult = await resend.emails.send({
      from: fromField,
      to: "kd@technexus.ca",
      subject: formattedSubject,
      html,
      replyTo: email
    });
    
    if (sendResult.error) {
      console.error('Error sending email via Resend:', sendResult.error);
      return res.status(500).json({
        success: false,
        error: sendResult.error
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: sendResult.data
    });
  } catch (error) {
    console.error('Error in sendContactEmail:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * @desc    Send a general email using Resend
 * @route   POST /api/email/send-email
 * @access  Private
 */
export const sendEmail = async (req: RequestWithFiles, res: Response) => {
  let email: any = null;
  
  try {
    // Log the full request body for debugging
    console.log('Full email request body:', req.body);
    console.log('Files attached:', req.files?.length || 0);
    
    // Extract fields from the request
    const { to, subject, text, html, body, cc, bcc } = req.body;
    
    // For compatibility, if body is provided but text/html aren't, use it as text
    const emailText = text || (body && !html ? body : undefined);
    const emailHtml = html || (body && body.includes('<') ? body : undefined);
    
    // Validate required fields with detailed logging
    if (!to || !subject || (!emailText && !emailHtml)) {
      console.log('Email validation failed:', { 
        hasTo: !!to, 
        hasSubject: !!subject, 
        hasText: !!emailText, 
        hasHtml: !!emailHtml,
        providedFields: Object.keys(req.body)
      });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (to, subject, and either text or html)',
        details: {
          to: !!to,
          subject: !!subject,
          content: !!(emailText || emailHtml)
        }
      });
    }
    
    // Get sender from contact form fields or use default
    let from;
    try {
      from = await getFormattedFromField();
      console.log('Using from address:', from);
    } catch (error) {
      console.error('Error getting formatted from field:', error);
      from = process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com';
      console.log('Falling back to default from address:', from);
    }
    
    // Get API key with validation
    const resendApiKey = await getResendApiKey();
    if (!resendApiKey) {
      console.error('Resend API key not found');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured properly (missing API key)'
      });
    }
    console.log('Resend API key available:', !!resendApiKey);
    
    // Create Resend client
    const resend = new Resend(resendApiKey);
    
    // Prepare attachment data - handle multer files if present
    const attachments = req.files && Array.isArray(req.files) 
      ? req.files.map((file) => ({
          filename: file.originalname,
          content: file.buffer
        }))
      : [];
    
    // Create email record in database
    try {
      const systemUserId = '00000000-0000-0000-0000-000000000000'; // Default system user UUID
      email = await prisma.email.create({
        data: {
          from,
          to,
          subject,
          body: emailText || emailHtml || "",
          status: 'pending',
          metadata: {},
          senderId: (req as any).user?.id || systemUserId, // Use authenticated user ID or system ID
          cc: cc || null,
          bcc: bcc || null
        }
      });
      
      console.log('Email record created in database:', {
        emailId: email.id,
        senderId: email.senderId,
        status: email.status
      });
    } catch (error) {
      console.error('Database error creating email record:', {
        error: error instanceof Prisma.PrismaClientKnownRequestError ? {
          code: error.code,
          meta: error.meta,
          message: error.message
        } : error,
        emailData: {
          from,
          to,
          subject,
          hasBody: !!(emailText || emailHtml),
          senderId: (req as any).user?.id || 'system'
        }
      });
      // Continue with sending even if database record creation fails
      // but create a temporary record for tracking
      email = { 
        id: `temp-${uuidv4()}`,
        status: 'pending',
        from,
        to,
        subject,
        body: emailText || emailHtml || "",
        senderId: (req as any).user?.id || '00000000-0000-0000-0000-000000000000'
      };
    }
    
    // Prepare email options with logging
    const emailOptions: CreateEmailOptions = {
      from,
      to,
      subject,
      text: emailText || '',
      html: emailHtml,
      attachments
    };
    
    if (cc) emailOptions.cc = cc;
    if (bcc) emailOptions.bcc = bcc;
    
    console.log('Attempting to send email with options:', {
      to: emailOptions.to,
      subject: emailOptions.subject,
      hasText: !!emailOptions.text,
      hasHtml: !!emailOptions.html,
      hasAttachments: attachments.length > 0,
      cc: emailOptions.cc,
      bcc: emailOptions.bcc
    });
    
    try {
      const sendResult = await resend.emails.send(emailOptions);
      console.log('Resend API response:', sendResult);
      
      if (sendResult.error) {
        console.error('Resend API error:', sendResult.error);
        
        if (email?.id) {
          await prisma.email.update({
            where: { id: email.id },
            data: {
              status: 'failed',
              metadata: {
                error: {
                  message: sendResult.error.message,
                  name: sendResult.error.name
                }
              }
            }
          });
        }
        
        return res.status(400).json({
          success: false,
          message: 'Failed to send email',
          error: sendResult.error
        });
      }
      
      // Handle successful response
      const emailId = sendResult.data?.id;
      if (!emailId) {
        throw new Error('No email ID returned from Resend');
      }
      
      console.log('Email sent successfully with Resend ID:', emailId);
      
      if (email?.id) {
        await prisma.email.update({
          where: { id: email.id },
          data: {
            status: 'sent',
            metadata: {
              provider: 'resend',
              providerMessageId: emailId,
              providerResponse: {
                id: emailId,
                timestamp: new Date().toISOString()
              }
            }
          }
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        data: {
          id: emailId,
          emailId: email?.id
        }
      });
    } catch (error) {
      console.error('Error sending email via Resend:', error);
      
      if (email?.id) {
        await prisma.email.update({
          where: { id: email.id },
          data: {
            status: 'failed',
            metadata: {
              error: {
                message: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
              }
            }
          }
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Unexpected error in email controller:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 