# Loan Management Application

A modern loan management application with a React frontend deployed on Vercel and a Node.js backend deployed on Railway.

## Project Structure

```
loan-management-app/
├── frontend/         # Next.js frontend application
└── backend/          # Node.js backend API
```

## Features

- User authentication and authorization
- Loan application and management
- Payment tracking
- Admin dashboard
- Reporting and analytics

## Local Development

### Backend (Node.js)

The backend is built with Node.js, Express, TypeScript, and MongoDB.

```bash
cd backend
npm install
npm run dev
```

### Frontend (Next.js)

The frontend is built with Next.js, TypeScript, and Tailwind CSS.

```bash
cd frontend
npm install
npm run dev
```

## Deployment

This application is set up for deployment to Vercel (frontend) and Railway (backend).

### Prerequisites

- GitHub account
- Vercel account (https://vercel.com)
- Railway account (https://railway.app)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) or use Railway's MongoDB plugin

### Deployment Steps

1. Push your code to GitHub
2. Deploy the frontend to Vercel:
   - Connect your GitHub repository
   - Set the root directory to `frontend`
   - Configure environment variables:
     - `NEXT_PUBLIC_API_URL`: Your Railway backend URL
3. Deploy the backend to Railway:
   - Connect your GitHub repository
   - Set the root directory to `backend`
   - Configure environment variables:
     - `PORT`: 5000
     - `JWT_SECRET`: Your secret key
     - `NODE_ENV`: production
     - `FRONTEND_URL`: Your Vercel frontend URL
   - Add a MongoDB database

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## License

MIT 