import express from 'express';
import { sendContactEmail } from '../controllers/emailController';

const router = express.Router();

// POST /api/email/send - Send an email using Resend
router.post('/send', sendContactEmail);

export default router; 