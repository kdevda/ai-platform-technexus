import agentRoutes from './routes/agentRoutes';

// Register routes
app.use('/api', userRoutes);
app.use('/api', loanRoutes);
app.use('/api', paymentRoutes);
app.use('/api', adminRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', notificationRoutes);
app.use('/api', documentRoutes);
app.use('/api', agentRoutes); 