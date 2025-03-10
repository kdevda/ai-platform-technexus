import express from 'express';
// Import only the routes that exist
// Comment out missing routes to avoid TypeScript errors
// import authRoutes from './auth.routes';
// import userRoutes from './user.routes';
// import metadataRoutes from './metadata.routes';
// import widgetRoutes from './widget.routes';
import layoutRoutes from './layouts.routes';
import emailRoutes from './emailRoutes';

const router = express.Router();

// Define routes
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/metadata', metadataRoutes);
// router.use('/widgets', widgetRoutes);
router.use('/layouts', layoutRoutes);
router.use('/email', emailRoutes);

export default router; 