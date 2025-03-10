import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a new pool instance using the connection URI
export const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

// Test the connection
pool.connect()
  .then(() => {
    console.log('PostgreSQL connected successfully');
  })
  .catch((error: Error) => {
    console.error('PostgreSQL connection error:', error);
  });

// Export types for database operations
export interface DatabaseTable {
  name: string;
  id: string;
  displayName: string;
  description?: string;
  isSystem: boolean;
  fields: DatabaseField[];
}

export interface DatabaseField {
  name: string;
  id: string;
  displayName: string;
  type: string;
  description?: string;
  isRequired: boolean;
  defaultValue?: any;
  isSystem: boolean;
}

export default {
  pool,
}; 