import express from 'express';
import multer from 'multer';
import { sendEmail } from '../controllers/emailController';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/emails/send - Send email with attachments
// @ts-ignore - TypeScript has issues with the multer types but this works at runtime
router.post('/send', upload.array('attachments'), sendEmail);

export default router; 