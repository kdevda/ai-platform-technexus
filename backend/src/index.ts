import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import loanRoutes from './routes/loanRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://loan-management-app.vercel.app'] 
    : 'http://localhost:3000',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Loan Management API is running...');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
}); 