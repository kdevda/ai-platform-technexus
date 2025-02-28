/**
 * Environment Variable Check Script
 * 
 * This script checks if all required environment variables are set.
 * Run this script with: node scripts/check-env.js
 */

// List of required environment variables
const requiredEnvVars = [
  'PORT',
  'MONGODB_URI',
  'POSTGRES_URI',
  'JWT_SECRET',
  'NODE_ENV'
];

console.log('Checking environment variables...');
console.log('================================');

// Check each required environment variable
let missingVars = [];
for (const envVar of requiredEnvVars) {
  if (process.env[envVar]) {
    // Mask the value for security
    const value = process.env[envVar];
    const maskedValue = value.length > 8 
      ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
      : '********';
    console.log(`✅ ${envVar}: ${maskedValue}`);
  } else {
    console.log(`❌ ${envVar}: Not set`);
    missingVars.push(envVar);
  }
}

console.log('================================');

// Print summary
if (missingVars.length === 0) {
  console.log('All required environment variables are set! 🎉');
} else {
  console.log(`Missing ${missingVars.length} required environment variables:`);
  missingVars.forEach(envVar => console.log(`- ${envVar}`));
  console.log('\nPlease set these environment variables in your Railway project:');
  console.log('1. Go to https://railway.app/project/YOUR_PROJECT_ID/variables');
  console.log('2. Add the missing environment variables');
  console.log('3. Redeploy your application');
}

// Print all available environment variables (names only)
console.log('\nAll available environment variables:');
console.log(Object.keys(process.env).join(', ')); 