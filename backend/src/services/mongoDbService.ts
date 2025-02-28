import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions;

/**
 * Connect to MongoDB
 */
export const connectMongoDB = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      console.error('MONGODB_URI is not defined in environment variables');
      console.error('Please make sure to set the MONGODB_URI environment variable in Railway');
      console.error('Current environment variables:', Object.keys(process.env).join(', '));
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit the process, allow the application to continue
    // This will let PostgreSQL still work even if MongoDB fails
    console.error('Application will continue without MongoDB connection');
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectMongoDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('MongoDB disconnected successfully');
    } else {
      console.log('MongoDB was not connected, no need to disconnect');
    }
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};

/**
 * Check if MongoDB is connected
 */
export const isMongoDBConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export default {
  connectMongoDB,
  disconnectMongoDB,
  isMongoDBConnected,
}; 