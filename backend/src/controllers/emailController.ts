import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore - Importing from utils directly, TypeScript will use the declaration file
import { 
  getResendApiKey, 
  getFormattedFromField
} from '../../utils/resendUtils';
import fs from 'fs';
import path from 'path';

// Define interface for Request with files property from Express.Multer
interface RequestWithFiles extends Request {
  files?: Express.Multer.File[];
}

// Define EmailData interface to match Prisma schema
interface EmailData {
  from: string;
  to: string;
  subject: string;
  textBody?: string;
  htmlBody?: string;
  body?: string;
  status: string;
  metadata: any;
  cc?: string;
  bcc?: string;
  senderId?: string;
}

// Define response from Resend API
interface ResendResponse {
  data?: {
    id: string;
    [key: string]: any;
  } | null;
  error?: any;
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
    const sendResult: ResendResponse = await resend.emails.send({
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
  // Define email at function scope level so it's accessible in catch block
  let email: any = null;
  
  try {
    const { to, subject, text, html, cc, bcc } = req.body;
    
    // Validate required fields
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (to, subject, and either text or html)'
      });
    }
    
    // Get sender from contact form fields or use default
    let from;
    try {
      from = await getFormattedFromField();
    } catch (error) {
      console.error('Error getting formatted from field:', error);
      from = process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com';
    }
    
    // Get API key
    const resendApiKey = await getResendApiKey();
    if (!resendApiKey) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured properly'
      });
    }
    
    // Create Resend client
    const resend = new Resend(resendApiKey);
    
    // Prepare attachment data - handle multer files if present
    const attachments = req.files && Array.isArray(req.files) 
      ? req.files.map((file) => ({
          filename: file.originalname,
          content: file.buffer
        }))
      : [];
    
    // Create email in database if it exists
    try {
      if (prisma.email) {
        // Prepare email data for database
        const emailData: any = {
          from,
          to,
          subject,
          textBody: text,
          htmlBody: html,
          status: 'pending',
          metadata: {}
        };
        
        // Add cc and bcc if provided
        if (cc) emailData.cc = cc;
        if (bcc) emailData.bcc = bcc;
        
        // Create record in database
        email = await prisma.email.create({
          data: emailData
        });
        
        console.log('Email created in database with ID:', email.id);
      }
    } catch (err) {
      console.error('Error creating email in database:', err);
      // Continue even if database operation fails
    }
    
    // Prepare email data for Resend
    const emailOptions: any = {
      from,
      to,
      subject,
      text,
      html,
      attachments
    };
    
    // Only include optional fields if they exist
    if (cc) emailOptions.cc = cc;
    if (bcc) emailOptions.bcc = bcc;
    
    // Send email via Resend
    const sendResult: ResendResponse = await resend.emails.send(emailOptions);
    
    if (sendResult.error) {
      console.error('Error sending email via Resend:', sendResult.error);
      
      // Update email status in database if it exists
      if (email?.id) {
        try {
          await prisma.email.update({
            where: { id: email.id },
            data: {
              status: 'failed',
              metadata: {
                error: sendResult.error
              }
            }
          });
        } catch (dbError) {
          console.error('Error updating email status in database:', dbError);
        }
      }
      
      return res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: sendResult.error
      });
    }
    
    // Update email record with Resend ID if available
    if (email?.id && sendResult.data?.id) {
      try {
        await prisma.email.update({
          where: { id: email.id },
          data: {
            status: 'sent',
            metadata: {
              provider: 'resend',
              providerMessageId: sendResult.data.id,
              providerResponse: JSON.stringify(sendResult.data)
            }
          }
        });
      } catch (dbError) {
        console.error('Error updating email status in database:', dbError);
      }
    }
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: {
        ...sendResult.data,
        emailId: email?.id
      }
    });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    
    // Update email status in database if it exists
    if (email?.id) {
      try {
        await prisma.email.update({
          where: { id: email.id },
          data: {
            status: 'failed',
            metadata: {
              error: error instanceof Error ? error.message : String(error)
            }
          }
        });
      } catch (dbError) {
        console.error('Error updating email status in database:', dbError);
      }
    }
    
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 