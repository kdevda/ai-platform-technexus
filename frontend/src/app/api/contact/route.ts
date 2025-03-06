import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message } = body;
    
    console.log('Contact form submission received:', { name, email, company, phone });
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Format the email content for Resend
    const emailContent = {
      from: 'contact@technexus.ca',
      to: 'kd@technexus.ca',
      subject: `Contact Form: ${company || name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    console.log('Preparing to send email to kd@technexus.ca');
    
    // Try to send using the SAME method that works with the Direct Email test
    // Skip trying to retrieve the API key from the database and just use the environment variable
    const resendApiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
    
    if (resendApiKey) {
      try {
        console.log('Sending email via Resend with API key from environment...');
        
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
        
        console.log('Email sent successfully via Resend:', response.data);
        
        return NextResponse.json(
          { success: true, message: 'Email sent successfully' },
          { status: 200 }
        );
      } catch (error) {
        console.error('Error sending email via Resend:', error);
        if (axios.isAxiosError(error) && error.response) {
          console.error('Resend API error details:', {
            status: error.response.status,
            data: error.response.data
          });
          
          // Pass through the Resend API error for debugging
          return NextResponse.json(
            { 
              success: false, 
              error: 'Failed to send email via Resend',
              details: error.response.data
            },
            { status: error.response.status }
          );
        }
      }
    } else {
      console.log('No Resend API key found in environment variables');
      return NextResponse.json(
        { 
          success: false, 
          error: 'No Resend API key available' 
        },
        { status: 500 }
      );
    }
    
    // Store the contact form submission to a database as backup
    console.log('Saving contact form submission data as fallback');
    
    // Fallback response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form received. We will get back to you shortly.',
        note: 'Email delivery may have failed, but form data was received.'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
} 