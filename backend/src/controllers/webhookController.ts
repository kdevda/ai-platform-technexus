import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

/**
 * Get the Resend webhook signing secret from the database
 * @returns {Promise<string|null>} The Resend webhook secret or null if not found
 */
const getResendWebhookSecret = async (): Promise<string | null> => {
  try {
    // Try to get the webhook secret from the database
    const webhookConfig = await prisma.resendConfig.findUnique({
      where: { key: 'RESEND_WEBHOOK_SECRET' }
    });
    
    if (webhookConfig?.value) {
      return webhookConfig.value;
    }
    
    // Fall back to environment variables
    return process.env.RESEND_WEBHOOK_SECRET || null;
  } catch (error) {
    console.error('Error retrieving Resend webhook secret:', error);
    // Fall back to environment variables in case of error
    return process.env.RESEND_WEBHOOK_SECRET || null;
  }
};

/**
 * Verify Resend webhook signature
 * @param req Request object with headers and body
 * @param webhookSecret The secret used to sign the webhook
 * @returns boolean indicating if signature is valid
 */
const verifySignature = (req: Request, webhookSecret: string): boolean => {
  try {
    const signature = req.headers['resend-signature'];
    if (!signature || typeof signature !== 'string') {
      console.error('Missing Resend signature header');
      return false;
    }

    // Get raw request body as a string
    const payload = JSON.stringify(req.body);
    
    // Create HMAC using the webhook secret
    const hmac = crypto.createHmac('sha256', webhookSecret);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');
    
    // Compare signatures using constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
};

/**
 * @desc    Handle Resend webhook events
 * @route   POST /api/webhooks/resend
 * @access  Public
 */
export const handleResendWebhook = async (req: Request, res: Response) => {
  try {
    console.log('Received webhook from Resend:', req.body);
    
    // Get the webhook secret
    const webhookSecret = await getResendWebhookSecret();
    
    // Verify the webhook signature if a secret is available
    if (webhookSecret) {
      const isValidSignature = verifySignature(req, webhookSecret);
      
      if (!isValidSignature) {
        console.error('Invalid webhook signature');
        return res.status(401).json({
          success: false,
          error: 'Invalid signature'
        });
      }
      
      console.log('✓ Webhook signature verified');
    } else {
      console.warn('⚠️ No webhook secret found. Signature verification skipped.');
    }
    
    // Extract event data from the request body
    const { type, data } = req.body;
    
    if (!type || !data) {
      return res.status(400).json({
        success: false,
        error: 'Invalid webhook payload'
      });
    }
    
    // Extract the message ID from the webhook data
    const messageId = data.id;
    
    if (!messageId) {
      return res.status(400).json({
        success: false,
        error: 'Missing message ID in webhook data'
      });
    }
    
    console.log(`Processing ${type} event for message ID: ${messageId}`);
    
    // Find the email in our database that corresponds to this message
    const email = await prisma.email.findFirst({
      where: {
        metadata: {
          path: ['providerMessageId'],
          equals: messageId
        }
      }
    });
    
    if (!email) {
      console.log(`No email found with provider message ID: ${messageId}`);
      // Return 200 anyway, as we don't want Resend to retry
      return res.status(200).json({
        success: true,
        message: 'Webhook received but no matching email found'
      });
    }
    
    // Update the email status based on the event type
    let status = email.status;
    let updatedMetadata = email.metadata as any || {};
    
    // Define timestamps for status updates
    const now = new Date();
    
    // Handle different event types
    switch (type) {
      case 'email.sent':
        status = 'sent';
        updatedMetadata.sentAt = now;
        break;
      case 'email.delivered':
        status = 'delivered';
        updatedMetadata.deliveredAt = now;
        break;
      case 'email.delivery_delayed':
        status = 'delayed';
        updatedMetadata.delayedAt = now;
        break;
      case 'email.complained':
        status = 'complained';
        updatedMetadata.complainedAt = now;
        break;
      case 'email.bounced':
        status = 'bounced';
        updatedMetadata.bouncedAt = now;
        updatedMetadata.bounceType = data.bounce?.type || 'unknown';
        updatedMetadata.bounceReason = data.bounce?.reason || 'unknown';
        break;
      case 'email.opened':
        // Don't change status, just add to metadata
        updatedMetadata.openEvents = [...(updatedMetadata.openEvents || []), {
          timestamp: now,
          ipAddress: data.ip_address,
          userAgent: data.user_agent
        }];
        break;
      case 'email.clicked':
        // Don't change status, just add to metadata
        updatedMetadata.clickEvents = [...(updatedMetadata.clickEvents || []), {
          timestamp: now,
          ipAddress: data.ip_address,
          userAgent: data.user_agent,
          url: data.url
        }];
        break;
      default:
        // Unknown event type, just store it in metadata
        updatedMetadata.events = [...(updatedMetadata.events || []), {
          type,
          timestamp: now,
          data
        }];
    }
    
    // Update the email record
    await prisma.email.update({
      where: { id: email.id },
      data: {
        status,
        metadata: {
          ...updatedMetadata,
          lastEvent: {
            type,
            timestamp: now
          }
        }
      }
    });
    
    console.log(`Updated email ${email.id} status to ${status} based on ${type} event`);
    
    // Return success
    res.status(200).json({
      success: true,
      message: `Webhook processed successfully: ${type}`
    });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    
    // Always return 200 to prevent Resend from retrying
    res.status(200).json({
      success: false,
      error: 'Error processing webhook, but acknowledging receipt'
    });
  }
}; 