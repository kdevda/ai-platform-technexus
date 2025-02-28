import { Request, Response } from 'express';
import { loanRepository } from '../repositories/loanRepository';

// @desc    Create a new loan application
// @route   POST /api/loans
// @access  Private
export const createLoan = async (req: Request, res: Response): Promise<void> => {
  const { amount, interestRate, term, purpose, collateral, collateralValue } = req.body;

  try {
    if (!req.user?.id) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const userId = req.user.id;

    const loan = await loanRepository.create({
      userId,
      amount,
      interestRate,
      term,
      purpose,
      collateral,
      collateralValue,
      status: 'PENDING',
    });

    res.status(201).json(loan);
  } catch (error) {
    console.error('Create loan error:', error);
    res.status(500).json({ message: 'Server error during loan creation' });
  }
};

// @desc    Get all loans for a user
// @route   GET /api/loans
// @access  Private
export const getLoans = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const userId = req.user.id;
    const loans = await loanRepository.findByUserId(userId);
    res.json(loans);
  } catch (error) {
    console.error('Get loans error:', error);
    res.status(500).json({ message: 'Server error while fetching loans' });
  }
};

// @desc    Get a loan by ID
// @route   GET /api/loans/:id
// @access  Private
export const getLoanById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const userId = req.user.id;
    const loan = await loanRepository.findById(req.params.id);

    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }

    // Check if the loan belongs to the user or if the user is an admin
    if (loan.userId !== userId && req.user.role !== 'ADMIN') {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    res.json(loan);
  } catch (error) {
    console.error('Get loan by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching loan' });
  }
};

// @desc    Update loan status (admin only)
// @route   PUT /api/loans/:id
// @access  Private/Admin
export const updateLoanStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const { status, startDate, endDate } = req.body;

    const loan = await loanRepository.findById(req.params.id);

    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }

    // Prepare update data
    const updateData: any = { status: status || loan.status };
    
    if (status === 'APPROVED' || status === 'ACTIVE') {
      updateData.startDate = startDate ? new Date(startDate) : new Date();
      
      if (loan.term) {
        const endDateValue = new Date(updateData.startDate);
        endDateValue.setMonth(endDateValue.getMonth() + loan.term);
        updateData.endDate = endDate ? new Date(endDate) : endDateValue;
      }
    }

    const updatedLoan = await loanRepository.update(req.params.id, updateData);
    res.json(updatedLoan);
  } catch (error) {
    console.error('Update loan status error:', error);
    res.status(500).json({ message: 'Server error while updating loan status' });
  }
}; 