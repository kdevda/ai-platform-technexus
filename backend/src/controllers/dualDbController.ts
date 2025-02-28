import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { loanRepository } from '../repositories/loanRepository';
import { paymentRepository } from '../repositories/paymentRepository';
import User from '../models/userModel';
import Loan from '../models/loanModel';

/**
 * Controller that demonstrates using both MongoDB and PostgreSQL
 */

/**
 * @desc    Migrate a user from MongoDB to PostgreSQL
 * @route   POST /api/migrate/user/:id
 * @access  Private/Admin
 */
export const migrateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find user in MongoDB
    const mongoUser = await User.findById(id);
    if (!mongoUser) {
      return res.status(404).json({ message: 'User not found in MongoDB' });
    }

    // Check if user already exists in PostgreSQL
    const existingUser = await userRepository.findByEmail(mongoUser.email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists in PostgreSQL' });
    }

    // Create user in PostgreSQL
    const pgUser = await userRepository.create({
      name: mongoUser.name,
      email: mongoUser.email,
      password: mongoUser.password, // Note: This assumes the password hash is compatible
      role: mongoUser.isAdmin ? 'ADMIN' : 'USER',
    });

    res.status(201).json({
      message: 'User migrated successfully',
      mongoUser: {
        _id: mongoUser._id,
        name: mongoUser.name,
        email: mongoUser.email,
        isAdmin: mongoUser.isAdmin,
      },
      pgUser: {
        id: pgUser.id,
        name: pgUser.name,
        email: pgUser.email,
        role: pgUser.role,
      },
    });
  } catch (error) {
    console.error('Error migrating user:', error);
    res.status(500).json({ message: 'Server error', error: String(error) });
  }
};

/**
 * @desc    Migrate a loan from MongoDB to PostgreSQL
 * @route   POST /api/migrate/loan/:id
 * @access  Private/Admin
 */
export const migrateLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find loan in MongoDB
    const mongoLoan = await Loan.findById(id).populate('user');
    if (!mongoLoan) {
      return res.status(404).json({ message: 'Loan not found in MongoDB' });
    }

    // Find user in PostgreSQL
    const pgUser = await userRepository.findByEmail((mongoLoan.user as any).email);
    if (!pgUser) {
      return res.status(404).json({ message: 'User not found in PostgreSQL. Migrate the user first.' });
    }

    // Create loan in PostgreSQL
    const pgLoan = await loanRepository.create({
      userId: pgUser.id,
      amount: mongoLoan.amount,
      interestRate: mongoLoan.interestRate,
      term: mongoLoan.term,
      purpose: mongoLoan.purpose,
      collateral: mongoLoan.collateral,
      collateralValue: mongoLoan.collateralValue,
      status: mongoLoan.status.toUpperCase(),
      startDate: mongoLoan.startDate,
      endDate: mongoLoan.endDate,
    });

    res.status(201).json({
      message: 'Loan migrated successfully',
      mongoLoan: {
        _id: mongoLoan._id,
        amount: mongoLoan.amount,
        status: mongoLoan.status,
        user: {
          _id: (mongoLoan.user as any)._id,
          name: (mongoLoan.user as any).name,
        },
      },
      pgLoan: {
        id: pgLoan.id,
        amount: pgLoan.amount,
        status: pgLoan.status,
        userId: pgLoan.userId,
      },
    });
  } catch (error) {
    console.error('Error migrating loan:', error);
    res.status(500).json({ message: 'Server error', error: String(error) });
  }
};

/**
 * @desc    Get user data from both databases
 * @route   GET /api/dual/user/:email
 * @access  Private
 */
export const getUserFromBothDbs = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    // Find user in MongoDB
    const mongoUser = await User.findOne({ email });
    
    // Find user in PostgreSQL
    const pgUser = await userRepository.findByEmail(email);

    res.status(200).json({
      message: 'User data retrieved from both databases',
      mongoUser: mongoUser ? {
        _id: mongoUser._id,
        name: mongoUser.name,
        email: mongoUser.email,
        isAdmin: mongoUser.isAdmin,
      } : null,
      pgUser: pgUser ? {
        id: pgUser.id,
        name: pgUser.name,
        email: pgUser.email,
        role: pgUser.role,
      } : null,
    });
  } catch (error) {
    console.error('Error getting user from both databases:', error);
    res.status(500).json({ message: 'Server error', error: String(error) });
  }
}; 