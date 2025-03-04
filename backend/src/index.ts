import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import loanRoutes from './routes/loanRoutes';
import dualDbRoutes from './routes/dualDbRoutes';
import schemaRoutes from './routes/schemaRoutes';
import permissionRoutes from './routes/permissionRoutes';
import roleRoutes from './routes/roleRoutes';
import integrationRoutes from './routes/integrationRoutes';
import { connectDatabases, checkDatabaseConnections } from './services/dbService';

// Load environment variables
dotenv.config();

// Log available environment variables (without their values for security)
console.log('Available environment variables:', Object.keys(process.env).join(', '));

// Create Express app
const app: Express = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL || 'https://loan-management-app.vercel.app',
        'https://www.technexus.ca',
        'https://technexus.ca'
      ] 
    : 'http://localhost:3000',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle OPTIONS requests for CORS preflight
app.options('*', cors(corsOptions));

// Health check route
app.get('/health', (req: Request, res: Response) => {
  const connections = checkDatabaseConnections();
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    databases: {
      mongodb: connections.mongodb ? 'connected' : 'disconnected',
      postgres: connections.postgres ? 'connected' : 'disconnected',
    },
  });
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Loan Management API is running...');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/dual', dualDbRoutes);
app.use('/api/schema', schemaRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/integrations', integrationRoutes);

// Start server
connectDatabases().then(() => {
  app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
    
    // Log database connection status
    const connections = checkDatabaseConnections();
    console.log('Database connections:', {
      mongodb: connections.mongodb ? 'connected' : 'disconnected',
      postgres: connections.postgres ? 'connected' : 'disconnected',
    });
  });
}).catch(error => {
  console.error('Failed to connect to databases:', error);
  
  // Start the server anyway, so we can at least serve the health check endpoint
  app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port} (with database connection issues)`);
  });
}); 