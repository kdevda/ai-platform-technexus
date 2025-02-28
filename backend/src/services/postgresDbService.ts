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
      throw new Error('POSTGRES_URI is not defined in environment variables');
    }
    
    const client = getPrismaClient();
    await client.$connect();
    console.log('PostgreSQL connected successfully');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
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