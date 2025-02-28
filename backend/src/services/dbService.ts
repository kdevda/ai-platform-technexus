import { connectMongoDB, disconnectMongoDB, isMongoDBConnected } from './mongoDbService';
import { connectPostgres, disconnectPostgres, getPrismaClient } from './postgresDbService';

/**
 * Connect to all databases
 */
export const connectDatabases = async (): Promise<void> => {
  try {
    // Try to connect to MongoDB, but don't fail the entire application if it fails
    try {
      await connectMongoDB();
    } catch (error) {
      console.error('Failed to connect to MongoDB, but continuing with PostgreSQL');
    }
    
    // Connect to PostgreSQL
    await connectPostgres();
    
    console.log('Database connections established');
    console.log(`MongoDB connected: ${isMongoDBConnected()}`);
    console.log('PostgreSQL connected: true');
  } catch (error) {
    console.error('Error connecting to databases:', error);
    throw error; // Re-throw to allow the caller to handle it
  }
};

/**
 * Disconnect from all databases
 */
export const disconnectDatabases = async (): Promise<void> => {
  try {
    // Disconnect from MongoDB if it was connected
    if (isMongoDBConnected()) {
      await disconnectMongoDB();
    }
    
    // Disconnect from PostgreSQL
    await disconnectPostgres();
    
    console.log('All database connections closed successfully');
  } catch (error) {
    console.error('Error disconnecting from databases:', error);
  }
};

/**
 * Check database connections
 */
export const checkDatabaseConnections = (): { mongodb: boolean; postgres: boolean } => {
  // Check MongoDB connection
  const mongoConnected = isMongoDBConnected();
  
  // For PostgreSQL, we'll just check if we can get the client
  // A more thorough check would involve making a query
  let postgresConnected = false;
  try {
    const prisma = getPrismaClient();
    postgresConnected = !!prisma;
  } catch (error) {
    console.error('Error checking PostgreSQL connection:', error);
  }
  
  return {
    mongodb: mongoConnected,
    postgres: postgresConnected,
  };
};

export default {
  connectDatabases,
  disconnectDatabases,
  checkDatabaseConnections,
  getPrismaClient,
}; 