/**
 * Script to initialize the Config table with essential configuration
 * Run this with:
 * node scripts/initConfig.js
 */

const Config = require('../models/Config');
const sequelize = require('../config/database');

const initializeConfig = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Check if Resend API key exists
    let resendConfig = await Config.findOne({
      where: { key: 'RESEND_API_KEY' }
    });

    // Create if doesn't exist
    if (!resendConfig) {
      console.log('Creating Resend API key configuration...');
      
      // Get API key from environment variable if available
      const apiKeyValue = process.env.RESEND_API_KEY || '';
      
      resendConfig = await Config.create({
        key: 'RESEND_API_KEY',
        value: apiKeyValue,
        description: 'API key for Resend email service',
        isSecret: true,
        isEncrypted: false
      });
      
      console.log('Resend API key configuration created successfully.');
    } else {
      console.log('Resend API key configuration already exists.');
    }

    // Initialize other required configurations
    const configs = [
      {
        key: 'EMAIL_FROM_ADDRESS',
        value: process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com',
        description: 'Default email address used for sending emails',
        isSecret: false,
        isEncrypted: false
      },
      {
        key: 'EMAIL_FROM_NAME',
        value: process.env.EMAIL_FROM_NAME || 'Technexus',
        description: 'Default display name for sending emails',
        isSecret: false,
        isEncrypted: false
      }
    ];

    // Create each config if it doesn't exist
    for (const config of configs) {
      const existing = await Config.findOne({
        where: { key: config.key }
      });

      if (!existing) {
        await Config.create(config);
        console.log(`${config.key} configuration created successfully.`);
      } else {
        console.log(`${config.key} configuration already exists.`);
      }
    }

    console.log('Config initialization completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing config:', error);
    process.exit(1);
  }
};

// Run the initialization function
initializeConfig(); 