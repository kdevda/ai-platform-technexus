import express from 'express';
import { migrateUser, migrateLoan, getUserFromBothDbs } from '../controllers/dualDbController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Migration routes (admin only)
router.post('/migrate/user/:id', protect, admin, migrateUser);
router.post('/migrate/loan/:id', protect, admin, migrateLoan);

// Dual database query routes
router.get('/user/:email', protect, getUserFromBothDbs);

export default router; 