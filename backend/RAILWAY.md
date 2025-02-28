# Railway Deployment Guide

This guide will help you troubleshoot and fix common issues when deploying the Loan Management API to Railway.

## Environment Variables

The application requires the following environment variables to be set in your Railway project:

- `PORT`: The port on which the server will run (Railway sets this automatically)
- `MONGODB_URI`: MongoDB connection string
- `POSTGRES_URI`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `NODE_ENV`: Environment (development, production)

## Fixing MongoDB Connection Issues

If you're seeing the error:

```
Error: MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.
```

Follow these steps to fix it:

1. **Check Environment Variables in Railway**:
   - Go to your Railway project dashboard
   - Click on the "Variables" tab
   - Verify that `MONGODB_URI` is set correctly
   - If not, add it with your MongoDB connection string

2. **Verify MongoDB Connection String**:
   - Make sure your MongoDB connection string is valid
   - For Railway MongoDB plugin, it should look like:
     ```
     mongodb://mongo:password@container.railway.app:port
     ```

3. **Redeploy Your Application**:
   - After setting the environment variables, redeploy your application
   - Go to the "Deployments" tab and click "Deploy"

## Health Check

The application provides a health check endpoint at `/health` that returns the status of database connections. You can use this to verify if your application is connecting to the databases correctly.

## Troubleshooting

If you're still having issues:

1. **Check Logs**:
   - Go to the "Deployments" tab
   - Click on the latest deployment
   - Check the logs for any error messages

2. **Run Environment Check**:
   - SSH into your Railway instance
   - Run `npm run check-env` to verify environment variables

3. **Manual Connection Test**:
   - SSH into your Railway instance
   - Run `node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected!')).catch(err => console.error(err))"`

## Fallback Mode

The application is designed to work even if MongoDB is not available. In this case, it will fall back to using only PostgreSQL. This is useful for development or if you're migrating from MongoDB to PostgreSQL.

To run in fallback mode, simply don't set the `MONGODB_URI` environment variable.

## Contact

If you're still having issues, please contact the development team for assistance. 