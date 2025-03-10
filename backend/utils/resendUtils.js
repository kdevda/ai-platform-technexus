const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get the Resend API key from the database
 * Falls back to environment variables if not found in database
 * @returns {Promise<string|null>} The Resend API key or null if not found
 */
async function getResendApiKey() {
  try {
    // Try to get the API key from the database
    const apiKeyConfig = await prisma.resendConfig.findUnique({
      where: { key: 'RESEND_API_KEY' }
    });
    
    if (apiKeyConfig?.value) {
      return apiKeyConfig.value;
    }
    
    // Fall back to environment variables
    return process.env.RESEND_API_KEY || null;
  } catch (error) {
    console.error('Error retrieving Resend API key:', error);
    // Fall back to environment variables in case of error
    return process.env.RESEND_API_KEY || null;
  }
}

/**
 * Get the Resend webhook signing secret from the database
 * Falls back to environment variables if not found in database
 * @returns {Promise<string|null>} The Resend webhook secret or null if not found
 */
async function getResendWebhookSecret() {
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
}

/**
 * Get email configuration from the database
 * @param {string} key - The configuration key to retrieve
 * @param {string} defaultValue - Default value if not found
 * @returns {Promise<string>} The configuration value or default if not found
 */
async function getEmailConfig(key, defaultValue = '') {
  try {
    const config = await prisma.resendConfig.findUnique({
      where: { key }
    });
    
    return config?.value || defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} configuration:`, error);
    return defaultValue;
  }
}

/**
 * Get the from address configuration
 * @returns {Promise<string>} The from address
 */
async function getFromAddress() {
  return getEmailConfig('EMAIL_FROM_ADDRESS', 'noreply@example.com');
}

/**
 * Get the from name configuration
 * @returns {Promise<string>} The from name
 */
async function getFromName() {
  return getEmailConfig('EMAIL_FROM_NAME', 'Technexus');
}

/**
 * Get the complete from field with name and address
 * @returns {Promise<string>} Formatted from field (e.g., "Technexus <noreply@example.com>")
 */
async function getFormattedFromField() {
  const fromName = await getFromName();
  const fromAddress = await getFromAddress();
  
  return `${fromName} <${fromAddress}>`;
}

module.exports = {
  getResendApiKey,
  getResendWebhookSecret,
  getEmailConfig,
  getFromAddress,
  getFromName,
  getFormattedFromField
}; 