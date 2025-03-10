import express from 'express';
import { handleResendWebhook } from '../controllers/webhookController';

const router = express.Router();

// POST /api/webhooks/resend - Handle Resend email events
router.post('/resend', handleResendWebhook);

export default router; 