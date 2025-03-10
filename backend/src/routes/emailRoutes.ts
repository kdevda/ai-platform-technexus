import express from 'express';
import multer from 'multer';
import { sendContactEmail, sendEmail } from '../controllers/emailController';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/email/contact - Send a contact form email using Resend
router.post('/contact', sendContactEmail);

// POST /api/email/send - Send any email with attachments using Resend
// @ts-ignore - TypeScript has issues with the multer types but this works at runtime
router.post('/send', upload.array('attachments'), sendEmail);

// POST /api/email/send-email - Also support this endpoint for backward compatibility
// @ts-ignore - TypeScript has issues with the multer types but this works at runtime
router.post('/send-email', upload.array('attachments'), sendEmail);

export default router; 