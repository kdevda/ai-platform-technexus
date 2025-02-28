import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a singleton instance of PrismaClient
let prisma: PrismaClient;

/**
 * Get the Prisma client instance
 */
export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return prisma;
};

/**
 * Connect to PostgreSQL
 */
export const connectPostgres = async (): Promise<void> => {
  try {
    if (!process.env.POSTGRES_URI) {
      console.error('POSTGRES_URI is not defined in environment variables');
      throw new Error('POSTGRES_URI is not defined in environment variables');
    }
    
    console.log('Attempting to connect to PostgreSQL...');
    
    const client = getPrismaClient();
    await client.$connect();
    
    // Test the connection with a simple query
    const result = await client.$queryRaw`SELECT 1 as connected`;
    console.log('PostgreSQL connection test result:', result);
    
    console.log('PostgreSQL connected successfully');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if ('stack' in error) {
        console.error('Stack trace:', error.stack);
      }
    }
    
    // Don't exit the process, allow the application to continue with limited functionality
    console.error('Application will continue with limited functionality due to database connection issues');
  }
};

/**
 * Disconnect from PostgreSQL
 */
export const disconnectPostgres = async (): Promise<void> => {
  try {
    if (prisma) {
      await prisma.$disconnect();
      console.log('PostgreSQL disconnected successfully');
    }
  } catch (error) {
    console.error('PostgreSQL disconnection error:', error);
  }
};

export default {
  getPrismaClient,
  connectPostgres,
  disconnectPostgres,
}; 