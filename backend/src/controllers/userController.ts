import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import generateToken from '../utils/generateToken';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find user in Postgres using the repository
    const user = await userRepository.findByEmail(email);

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Verify password using the repository method
    const isPasswordValid = await userRepository.verifyPassword(user, password);

    if (isPasswordValid) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists in Postgres
    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create user in Postgres using the repository
    const user = await userRepository.create({
      name,
      email,
      password,
      role: 'USER',
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Find user in Postgres using the repository
    const user = await userRepository.findById(req.user.id);

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
}; 