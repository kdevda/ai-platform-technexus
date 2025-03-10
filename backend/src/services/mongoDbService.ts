import mongoose, { Model } from 'mongoose';
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

/**
 * Get a Mongoose model by its name
 */
export const getModelByName = async (modelName: string): Promise<Model<any> | null> => {
  try {
    // Check if model is already registered
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName];
    }
    
    // Check if MongoDB is connected
    if (!mongoose.connection || !mongoose.connection.db) {
      console.error('MongoDB is not connected');
      return null;
    }
    
    // If not registered, try to get the schema
    const schema = await mongoose.connection.db.collection(modelName).findOne({});
    if (!schema) {
      console.error(`No schema found for model: ${modelName}`);
      return null;
    }
    
    // Create a dynamic schema based on the first document
    const dynamicSchema = new mongoose.Schema({}, { strict: false });
    
    // Register and return the model
    return mongoose.model(modelName, dynamicSchema);
  } catch (error) {
    console.error(`Error getting model ${modelName}:`, error);
    return null;
  }
};

export default {
  connectMongoDB,
  disconnectMongoDB,
  isMongoDBConnected,
  getModelByName,
}; 