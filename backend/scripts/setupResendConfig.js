// Script to initialize the ResendConfig table with Resend API key
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function setupResendConfig() {
  try {
    console.log('Checking if Resend API key exists in database...');
    
    // Check if API key already exists
    const existingConfig = await prisma.resendConfig.findUnique({
      where: {
        key: 'RESEND_API_KEY'
      }
    });
    
    if (existingConfig) {
      console.log('Resend API key already exists in the database.');
      console.log(`- Key: ${existingConfig.key}`);
      console.log(`- Description: ${existingConfig.description || 'No description'}`);
      console.log(`- Has Value: ${existingConfig.value ? 'Yes (hidden)' : 'No'}`);
      console.log(`- Created At: ${existingConfig.createdAt}`);
      console.log(`- Updated At: ${existingConfig.updatedAt}`);
    } else {
      // Get API key from environment variable if available
      const apiKeyValue = process.env.RESEND_API_KEY || '';
      
      if (!apiKeyValue) {
        console.log('⚠️ No RESEND_API_KEY found in environment variables.');
        console.log('You will need to manually update the key value in the database.');
      }
      
      // Create the API key entry
      const newConfig = await prisma.resendConfig.create({
        data: {
          key: 'RESEND_API_KEY',
          value: apiKeyValue,
          description: 'API key for Resend email service',
          isSecret: true
        }
      });
      
      console.log('✅ Resend API key created successfully in the database.');
      console.log(`- Key: ${newConfig.key}`);
      console.log(`- Description: ${newConfig.description}`);
      console.log(`- Created At: ${newConfig.createdAt}`);
    }
    
    // Check if webhook secret exists
    const existingWebhookSecret = await prisma.resendConfig.findUnique({
      where: {
        key: 'RESEND_WEBHOOK_SECRET'
      }
    });
    
    if (existingWebhookSecret) {
      console.log('Resend webhook signing secret already exists in the database.');
    } else {
      // Get webhook secret from environment variable if available
      const webhookSecretValue = process.env.RESEND_WEBHOOK_SECRET || '';
      
      if (!webhookSecretValue) {
        console.log('⚠️ No RESEND_WEBHOOK_SECRET found in environment variables.');
        console.log('You will need to manually update the secret value in the database.');
      }
      
      // Create the webhook secret entry
      const newWebhookSecret = await prisma.resendConfig.create({
        data: {
          key: 'RESEND_WEBHOOK_SECRET',
          value: webhookSecretValue,
          description: 'Signing secret for verifying Resend webhooks',
          isSecret: true
        }
      });
      
      console.log('✅ Resend webhook signing secret created successfully in the database.');
    }
    
    // Add additional email configuration
    const emailConfigs = [
      {
        key: 'EMAIL_FROM_ADDRESS',
        value: process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com',
        description: 'Default email address used for sending emails',
        isSecret: false
      },
      {
        key: 'EMAIL_FROM_NAME',
        value: process.env.EMAIL_FROM_NAME || 'Technexus',
        description: 'Default display name for sending emails',
        isSecret: false
      }
    ];
    
    for (const config of emailConfigs) {
      const existing = await prisma.resendConfig.findUnique({
        where: { key: config.key }
      });
      
      if (!existing) {
        await prisma.resendConfig.create({ data: config });
        console.log(`✅ ${config.key} configuration created successfully.`);
      } else {
        console.log(`${config.key} configuration already exists.`);
      }
    }
    
    console.log('ResendConfig initialization completed successfully.');
  } catch (error) {
    console.error('Error initializing ResendConfig:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup function
setupResendConfig(); 