import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';

interface DecodedToken {
  id: string;
}

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        roles: string[];
      };
    }
  }
}

// Protect routes
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;

      // Get user from the token using Postgres repository
      const user = await userRepository.findById(decoded.id);
      
      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      // Get user roles
      const userRoles = user.userRoles?.map(ur => ur.role.name) || [];

      // Add user to request object (excluding password)
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roles: userRoles
      };

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
};

// Admin middleware
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.roles.includes('ADMIN'))) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

// Role-based middleware
export const hasRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      req.user && 
      (req.user.role === role || req.user.roles.includes(role))
    ) {
      next();
    } else {
      res.status(401).json({ message: `Not authorized, requires ${role} role` });
    }
  };
}; 