# Deployment Guide

This guide will help you deploy the Loan Management Application to Vercel (frontend) and Railway (backend).

## Prerequisites

- GitHub account
- Vercel account (https://vercel.com)
- Railway account (https://railway.app)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) or use Railway's MongoDB plugin

## Step 1: Push Your Code to GitHub

1. Create a new GitHub repository
2. Initialize Git in your project folder:
   ```bash
   cd loan-management-app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/loan-management-app.git
   git push -u origin main
   ```

## Step 2: Deploy the Frontend to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Root Directory: `frontend`
   - Framework Preset: Next.js
   - Environment Variables:
     - `NEXT_PUBLIC_API_URL`: Your Railway backend URL (e.g., https://loan-management-api.railway.app/api)
5. Click "Deploy"

## Step 3: Deploy the Backend to Railway

1. Log in to your Railway account
2. Click "New Project" > "Deploy from GitHub repo"
3. Select your GitHub repository
4. Configure the project:
   - Root Directory: `backend`
   - Environment Variables:
     - `PORT`: 5000
     - `JWT_SECRET`: Your secret key (generate a strong one)
     - `NODE_ENV`: production
5. Add a MongoDB database:
   - Click "New" > "Database" > "Add MongoDB"
   - Once created, Railway will automatically add the `MONGODB_URI` environment variable
6. Deploy the project

## Step 4: Connect Frontend to Backend

1. After deploying the backend, get the deployment URL from Railway
2. Go to your Vercel project settings
3. Update the `NEXT_PUBLIC_API_URL` environment variable with your Railway backend URL
4. Redeploy the frontend

## Step 5: Verify the Deployment

1. Visit your Vercel deployment URL to access the frontend
2. Test the application by registering a new user and logging in
3. Verify that the frontend can communicate with the backend API

## Continuous Deployment

Both Vercel and Railway support continuous deployment. When you push changes to your GitHub repository, they will automatically redeploy your application.

## Custom Domains

1. **Vercel**: Go to your project settings > Domains to add a custom domain for your frontend
2. **Railway**: Go to your project settings > Domains to add a custom domain for your backend API

## Monitoring and Logs

- **Vercel**: Access logs and monitoring from your project dashboard
- **Railway**: View logs from the project's "Deployments" tab

## Troubleshooting

- If the frontend can't connect to the backend, check the `NEXT_PUBLIC_API_URL` environment variable
- Ensure CORS is properly configured in the backend to allow requests from your Vercel domain
- Check Railway logs for any backend errors 