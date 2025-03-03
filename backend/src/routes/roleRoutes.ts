import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} from '../controllers/roleController';

const router = express.Router();

// All role routes require authentication and admin role
router.use(protect);
router.use(admin);

// Route definitions
router.route('/')
  .get(getAllRoles)
  .post(createRole);

router.route('/:id')
  .get(getRoleById)
  .put(updateRole)
  .delete(deleteRole);

export default router; 