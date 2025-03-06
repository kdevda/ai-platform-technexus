import express from 'express';
import { agentController } from '../controllers/agentController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all agent routes
router.use(protect);

// Agent CRUD operations
router.get('/agents', agentController.getAgents);
router.get('/agents/:id', agentController.getAgentById);
router.post('/agents', agentController.createAgent);
router.put('/agents/:id', agentController.updateAgent);
router.delete('/agents/:id', agentController.deleteAgent);

// Agent status management
router.patch('/agents/:id/status', agentController.toggleAgentStatus);

// Agent execution
router.post('/agents/:id/execute', agentController.executeAgent);

// Agent templates
router.get('/templates', agentController.getAgentTemplates);

// Agent execution history
router.get('/agents/:id/history', agentController.getAgentExecutionHistory);

// Agent usage statistics
router.get('/agents/:id/stats', agentController.getAgentUsageStats);

// Document management for agents
router.post('/agents/:id/documents', agentController.uploadAgentDocuments);

// Flow operations
router.post('/flows', agentController.saveFlow);
router.put('/flows/:id', agentController.saveFlow);
router.get('/flows/:id', agentController.getFlowById);

// API provider information
router.get('/providers', agentController.getApiProviderSettings);

export default router; 