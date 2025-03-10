import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import generateToken from '../utils/generateToken';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Log request details (but not the password)
    console.log(`Login attempt for email: ${email}`);
    
    // Validate input
    if (!email || !password) {
      console.log('Login failed: Missing email or password');
      res.status(400).json({ message: 'Email and password are required', details: 'validation_error' });
      return;
    }

    // Find user in Postgres using the repository
    const user = await userRepository.findByEmail(email);

    if (!user) {
      console.log(`Login failed: User not found for email: ${email}`);
      res.status(401).json({ message: 'Invalid email or password', details: 'credentials_error' });
      return;
    }

    // Verify password using the repository method
    const isPasswordValid = await userRepository.verifyPassword(user, password);

    if (isPasswordValid) {
      // Extract roles from userRoles
      const roles = user.userRoles?.map(ur => ur.role.name) || [];
      
      // Generate JWT token
      const token = generateToken(user.id);
      
      console.log(`Login successful for user: ${user.id}`);
      
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roles: roles,
        token: token,
      });
    } else {
      console.log(`Login failed: Invalid password for email: ${email}`);
      res.status(401).json({ message: 'Invalid email or password', details: 'credentials_error' });
    }
  } catch (error) {
    console.error('Login error:', error);
    // Provide more detailed error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    
    console.error(`Login error details: ${errorMessage}\n${errorStack}`);
    
    res.status(500).json({ 
      message: 'Server error during login', 
      details: 'server_error',
      error: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error'
    });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    console.log('Registration attempt for:', email);
    
    if (!name || !email || !password) {
      console.log('Missing required fields:', { name: !!name, email: !!email, password: !!password });
      res.status(400).json({ message: 'Please provide all required fields: name, email, and password' });
      return;
    }

    // Check if user exists in Postgres
    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
      console.log('User already exists:', email);
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
      console.log('User created successfully:', user.id);
      
      // Get the user with roles
      const userWithRoles = await userRepository.findById(user.id);
      const roles = userWithRoles?.userRoles?.map(ur => ur.role.name) || [];
      
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roles: roles,
        token: generateToken(user.id),
      });
    } else {
      console.log('Failed to create user, returned null');
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    // More detailed error message
    let errorMessage = 'Server error during registration';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    
    res.status(500).json({ message: errorMessage });
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
      // Extract roles from userRoles
      const roles = user.userRoles?.map(ur => ur.role.name) || [];
      
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roles: roles,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

// @desc    Assign a role to a user
// @route   POST /api/users/:id/roles
// @access  Admin
export const assignRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!id || !role) {
      res.status(400).json({ message: 'User ID and role are required' });
      return;
    }
    
    // Check if user exists
    const user = await userRepository.findById(id);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Assign the role
    await userRepository.assignRole(id, role);
    
    // Get updated user with roles
    const updatedUser = await userRepository.findById(id);
    const roles = updatedUser?.userRoles?.map(ur => ur.role.name) || [];
    
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      roles: roles,
    });
  } catch (error) {
    console.error('Assign role error:', error);
    
    let errorMessage = 'Server error while assigning role';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    
    res.status(500).json({ message: errorMessage });
  }
};

// @desc    Remove a role from a user
// @route   DELETE /api/users/:id/roles/:role
// @access  Admin
export const removeRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, role } = req.params;
    
    if (!id || !role) {
      res.status(400).json({ message: 'User ID and role are required' });
      return;
    }
    
    // Check if user exists
    const user = await userRepository.findById(id);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Remove the role
    await userRepository.removeRole(id, role);
    
    // Get updated user with roles
    const updatedUser = await userRepository.findById(id);
    const roles = updatedUser?.userRoles?.map(ur => ur.role.name) || [];
    
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      roles: roles,
    });
  } catch (error) {
    console.error('Remove role error:', error);
    
    let errorMessage = 'Server error while removing role';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    
    res.status(500).json({ message: errorMessage });
  }
}; 