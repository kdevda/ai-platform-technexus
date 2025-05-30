export const getAdminNotificationEmail = ({
  name,
  email,
  company,
  subject,
  message,
  phone
}: {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
  phone?: string;
}) => `
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
  ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
  ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
  <p><strong>Message:</strong></p>
  <p>${message.replace(/\n/g, '<br>')}</p>
`;

export const getUserConfirmationEmail = ({
  name,
  company
}: {
  name: string;
  company?: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <title>Welcome to the Future of Lending</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #000000;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: #ffffff !important;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px 30px;
      background-color: #ffffff;
      color: #333333;
    }
    .content p, .content ul {
      color: inherit;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666666;
      border-radius: 0 0 8px 8px;
    }
    .button-container {
      margin: 35px 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #000000;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s ease;
      min-width: 200px;
      text-align: center;
    }
    .button:hover {
      transform: translateY(-1px);
      opacity: 0.9;
    }
    .button.demo {
      background: #000000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .social-links {
      margin-top: 20px;
    }
    .social-links a {
      color: #666666;
      text-decoration: none;
      margin: 0 10px;
    }
    @media (prefers-color-scheme: dark) {
      body {
        color: #ffffff;
        background-color: #1a1a1a;
      }
      .content {
        background-color: #2d2d2d;
        color: #ffffff;
      }
      .content p, .content ul {
        color: #ffffff;
      }
      .footer {
        background-color: #1a1a1a;
        color: #cccccc;
      }
      .social-links a {
        color: #cccccc;
      }
      .button, .button.demo {
        background-color: #333333;
        color: #ffffff !important;
      }
      .button:hover {
        background-color: #444444;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Intelligent Lending</h1>
    </div>
    <div class="content">
      <p>Hello ${name},</p>
      <p>Thank you for reaching out to us${company ? ` from ${company}` : ''}. We have received your message and appreciate your interest in Technexus - AI Loan Management System.</p>
      <p>Our team will review your inquiry and get back to you as soon as possible, typically within 24 hours.</p>
      <p>Ready to revolutionize your lending process? Book a personalized demo session with our team and discover how Technexus can transform your operations with the power of AI.</p>
      <div class="button-container">
        <a href="https://calendly.com/technexus_ca/technexus-ai-loan-management-system-intro" class="button demo">Schedule Your Demo →</a>
      </div>
      <p>In the meantime, you might be interested in:</p>
      <ul>
        <li>Exploring our AI-powered lending solutions</li>
        <li>Learning about our success stories</li>
        <li>Understanding how we can help streamline your lending operations</li>
      </ul>
      <div class="button-container">
        <a href="https://technexus.ca" class="button">Visit Our Website</a>
      </div>
      <p>Best regards,<br>Technexus Team</p>
    </div>
    <div class="footer">
      <p>Technexus - AI Loan Management System</p>
      <p>40 King St W, 41st Floor<br>Toronto, ON M5H 3Y2<br>Canada</p>
      <div class="social-links">
        <a href="#">LinkedIn</a> |
        <a href="#">Twitter</a> |
        <a href="#">Facebook</a>
      </div>
      <p style="margin-top: 20px; font-size: 12px;">This email was sent to you because you contacted us through our website. If you didn't submit this request, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`; 