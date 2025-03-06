import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

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
    
    // Get API key from environment
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('No Resend API key found in environment');
      return res.status(500).json({
        success: false,
        error: 'Email service configuration error'
      });
    }
    
    // Format the email content
    const emailContent = {
      from: 'contact@technexus.ca',
      to: 'kd@technexus.ca',
      subject: subject || `Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    console.log('Sending email via Resend API...', {
      to: emailContent.to,
      from: emailContent.from,
      subject: emailContent.subject
    });
    
    // Send email using Resend API
    const response = await axios.post(
      'https://api.resend.com/emails',
      emailContent,
      {
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Email sent successfully:', response.data);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: response.data
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    let errorMessage = 'Failed to send email';
    let statusCode = 500;
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Resend API error:', axiosError.response.data);
        errorMessage = `Resend API error: ${axiosError.response.status}`;
        statusCode = axiosError.response.status >= 400 && axiosError.response.status < 500 
          ? axiosError.response.status 
          : 500;
      }
    }
    
    res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
}; 