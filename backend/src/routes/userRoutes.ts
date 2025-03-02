import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  assignRole,
  removeRole,
} from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authUser);
router.post('/', registerUser);
router.get('/profile', protect, getUserProfile);

// Role management routes
router.post('/:id/roles', protect, admin, assignRole);
router.delete('/:id/roles/:role', protect, admin, removeRole);

export default router; 