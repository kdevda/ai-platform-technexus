import { Request, Response } from 'express';
import Loan from '../models/Loan';

// @desc    Create a new loan application
// @route   POST /api/loans
// @access  Private
export const createLoan = async (req: Request, res: Response) => {
  const { amount, interestRate, term, purpose } = req.body;

  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const loan = await Loan.create({
      user: req.user._id,
      amount,
      interestRate,
      term,
      purpose,
      status: 'pending',
    });

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all loans for a user
// @route   GET /api/loans
// @access  Private
export const getLoans = async (req: Request, res: Response) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const loans = await Loan.find({ user: req.user._id });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a loan by ID
// @route   GET /api/loans/:id
// @access  Private
export const getLoanById = async (req: Request, res: Response) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Check if the loan belongs to the user or if the user is an admin
    if (loan.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update loan status (admin only)
// @route   PUT /api/loans/:id
// @access  Private/Admin
export const updateLoanStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { status, startDate, endDate } = req.body;

    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    loan.status = status || loan.status;
    
    if (status === 'approved' || status === 'active') {
      loan.startDate = startDate ? new Date(startDate) : new Date();
      
      if (loan.term) {
        const endDateValue = new Date(loan.startDate);
        endDateValue.setMonth(endDateValue.getMonth() + loan.term);
        loan.endDate = endDate ? new Date(endDate) : endDateValue;
      }
    }

    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 