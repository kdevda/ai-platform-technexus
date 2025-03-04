import express from 'express';
import { 
  getAllIntegrations,
  getIntegrationById,
  createIntegration,
  updateIntegration,
  toggleIntegrationStatus,
  deleteIntegration
} from '../controllers/integrationController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// All routes are protected and require admin privileges
router.use(protect);
router.use(admin);

// GET all integrations
router.get('/', getAllIntegrations);

// GET specific integration by ID
router.get('/:id', getIntegrationById);

// POST create new integration
router.post('/', createIntegration);

// PUT update integration
router.put('/:id', updateIntegration);

// PATCH toggle integration status
router.patch('/:id/toggle', toggleIntegrationStatus);

// DELETE integration
router.delete('/:id', deleteIntegration);

export default router; 