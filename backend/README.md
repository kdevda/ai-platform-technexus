# Loan Management API

This is the backend API for the Loan Management Application, which uses both MongoDB and PostgreSQL databases.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/loan-management
   POSTGRES_URI=postgresql://postgres:password@localhost:5432/loan-management
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

## Database Setup

### MongoDB
- Make sure MongoDB is installed and running on your system
- The application will automatically connect to the MongoDB instance using the URI in the `.env` file

### PostgreSQL
- Make sure PostgreSQL is installed and running on your system
- Create a database named `loan-management`
- Run the Prisma migrations to set up the database schema:
  ```
  npm run prisma:migrate
  ```
- Initialize the database with sample data:
  ```
  npm run prisma:init
  ```

## Development

Start the development server:
```
npm run dev
```

## Database Management

### PostgreSQL (Prisma)
- Generate Prisma client: `npm run prisma:generate`
- Run migrations: `npm run prisma:migrate`
- Open Prisma Studio: `npm run prisma:studio`
- Initialize sample data: `npm run prisma:init`

## Architecture

This application uses a polyglot persistence approach with two databases:

### MongoDB
Used for:
- Document storage
- User activity logs
- Feature flags
- Any data with flexible schema requirements

### PostgreSQL
Used for:
- User accounts
- Loan records
- Payment transactions
- Financial reporting
- Any data requiring strong relational integrity

## API Routes

- `/api/users` - User authentication and profile management
- `/api/loans` - Loan application and management

## Deployment

For deployment, you'll need to set up both MongoDB and PostgreSQL databases. Services like Railway support both databases and make it easy to deploy your application.

## License

ISC 