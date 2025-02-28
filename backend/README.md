# Loan Management API

A robust API for managing loans, users, and payments with dual database support (MongoDB and PostgreSQL).

## Features

- **Dual Database Architecture**: Uses both MongoDB and PostgreSQL
- **Authentication**: JWT-based authentication system
- **User Management**: Create, read, update, and delete users
- **Loan Management**: Create, read, update, and delete loans
- **Payment Processing**: Track and manage loan payments
- **Data Migration**: Tools to migrate data between databases
- **Health Monitoring**: Endpoints to check system health

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd loan-management-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/loan-management
   POSTGRES_URI=postgresql://postgres:password@localhost:5432/loan-management
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Generate Prisma client:
   ```
   npx prisma generate
   ```

5. Run database migrations:
   ```
   npx prisma migrate dev
   ```

6. Build the application:
   ```
   npm run build
   ```

7. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Loans
- `GET /api/loans` - Get all loans
- `GET /api/loans/:id` - Get loan by ID
- `POST /api/loans` - Create new loan
- `PUT /api/loans/:id` - Update loan
- `DELETE /api/loans/:id` - Delete loan (admin only)

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments` - Create new payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment (admin only)

### Dual Database Operations
- `POST /api/dual/migrate/user/:id` - Migrate user from MongoDB to PostgreSQL
- `POST /api/dual/migrate/loan/:id` - Migrate loan from MongoDB to PostgreSQL
- `GET /api/dual/user/:email` - Get user data from both databases

### Health Check
- `GET /health` - Check system health and database connections

## Deployment on Railway

### Prerequisites
- [Railway CLI](https://docs.railway.app/develop/cli)
- Git

### Setup

1. Initialize Git repository (if not already done):
   ```
   ./scripts/setup-git.sh
   ```
   This script will:
   - Initialize a Git repository
   - Create a .gitignore file
   - Make an initial commit

2. Create a new project on [Railway](https://railway.app)

3. Link your local repository to Railway:
   ```
   railway link
   ```

4. Set up environment variables on Railway:
   - `PORT=5000`
   - `MONGODB_URI=your_mongodb_connection_string`
   - `POSTGRES_URI=your_postgres_connection_string`
   - `JWT_SECRET=your_jwt_secret`
   - `NODE_ENV=production`

5. Deploy your application:
   ```
   railway up
   ```

### Troubleshooting Railway Deployment

If you encounter issues with your Railway deployment, please refer to the [RAILWAY.md](./RAILWAY.md) file for detailed troubleshooting steps.

Common issues include:
- MongoDB connection errors
- Environment variable configuration
- Build process failures

You can run the environment check script to verify your configuration:
```
npm run check-env
```

## Development

### Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server in development mode with hot reloading
- `npm run build` - Build the TypeScript code
- `npm test` - Run tests
- `npm run lint` - Run linting
- `npm run check-env` - Check environment variables

## Architecture

The application follows a clean architecture pattern:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Handle data access
- **Models**: Define data structures
- **Middleware**: Handle cross-cutting concerns
- **Routes**: Define API endpoints
- **Utils**: Utility functions

## Database Design

### MongoDB Collections
- Users
- Loans
- Payments

### PostgreSQL Tables
- Users
- Loans
- Payments

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact the development team. 