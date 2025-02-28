import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import generateToken from '../utils/generateToken';
import { Types } from 'mongoose';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }) as IUser | null;

    if (user && (await user.matchPassword(password))) {
      const userId = user._id as Types.ObjectId;
      
      res.json({
        _id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(userId.toString()),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
    }) as IUser;

    if (user) {
      const userId = user._id as Types.ObjectId;
      
      res.json({
        _id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(userId.toString()),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?._id) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    const user = await User.findById(req.user._id) as IUser | null;

    if (user) {
      const userId = user._id as Types.ObjectId;
      
      res.json({
        _id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 