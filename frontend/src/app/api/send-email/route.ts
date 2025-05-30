import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAdminNotificationEmail, getUserConfirmationEmail } from '@/utils/emailTemplates';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message, phone } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'Technexus Contact Form <contact@technexus.ca>',
      to: 'kd@technexus.ca',
      subject: subject || `Contact Form: ${company || name}`,
      html: getAdminNotificationEmail({ name, email, company, subject, message, phone }),
      replyTo: email
    });

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'Technexus - AI LMS <contact@technexus.ca>',
      to: email,
      subject: 'Welcome to Intelligent Lending',
      html: getUserConfirmationEmail({ name, company }),
      replyTo: 'kd@technexus.ca'
    });

    return NextResponse.json({
      success: true,
      adminEmail: adminEmailResult,
      userEmail: userEmailResult
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 