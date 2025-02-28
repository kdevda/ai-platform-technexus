import express from 'express';
import {
  createLoan,
  getLoans,
  getLoanById,
  updateLoanStatus,
} from '../controllers/loanController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createLoan)
  .get(protect, getLoans);

router.route('/:id')
  .get(protect, getLoanById)
  .put(protect, admin, updateLoanStatus);

export default router; 