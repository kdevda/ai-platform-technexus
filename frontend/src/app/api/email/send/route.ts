import { NextResponse } from 'next/server';
import axios from 'axios';

// This API route is specifically for sending emails with Resend

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, apiKey } = body;
    
    // Log the request (omit apiKey for security)
    console.log('Email send request received:', { name, email, subject });
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Get API key from various sources, in order of preference:
    // 1. Direct API key (for testing)
    // 2. Server-side environment variable (most secure)
    // 3. Public environment variable (less secure)
    // 4. Hardcoded fallback (for demo purposes)
    const resendApiKey = apiKey || 
                        process.env.RESEND_API_KEY || 
                        process.env.NEXT_PUBLIC_RESEND_API_KEY;
    
    // For debugging - log whether we found a key (but not the key itself)
    console.log('API key source:', 
      apiKey ? 'Provided in request' :
      process.env.RESEND_API_KEY ? 'Server environment variable' :
      process.env.NEXT_PUBLIC_RESEND_API_KEY ? 'Public environment variable' :
      'None found'
    );
    
    if (!resendApiKey) {
      console.error('No Resend API key found in any source');
      
      // For development and testing only
      if (process.env.NODE_ENV === 'development') {
        // Return a fake success response with detailed info
        return NextResponse.json(
          { 
            success: true,
            message: 'DEVELOPMENT MODE: Email would have been sent if API key was configured',
            mock: true,
            details: {
              to: 'kd@technexus.ca',
              subject: subject || `Message from ${name}`,
              fromName: name,
              fromEmail: email
            }
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'No Resend API key provided',
          help: 'Add RESEND_API_KEY to your .env.local file or provide an API key in the request'
        },
        { status: 400 }
      );
    }
    
    // Format the email content
    const emailContent = {
      from: 'contact@technexus.ca',
      to: 'kd@technexus.ca',
      subject: subject || `Message from ${name}`,
      html: `
        <h2>New Message</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    console.log('Attempting to send email via Resend API');
    
    // Send using Resend API
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
    
    console.log('Resend API response:', response.data);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        data: response.data
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    let errorDetail = 'An unknown error occurred';
    let statusCode = 500;
    
    if (axios.isAxiosError(error) && error.response) {
      errorDetail = JSON.stringify(error.response.data);
      statusCode = error.response.status;
      console.error('Resend API error details:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        detail: errorDetail 
      },
      { status: statusCode }
    );
  }
} 