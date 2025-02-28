import { User, Prisma } from '@prisma/client';
import { getPrismaClient } from '../services/postgresDbService';
import bcrypt from 'bcryptjs';

/**
 * Repository for user operations using PostgreSQL
 */
export const userRepository = {
  /**
   * Find a user by email
   * @param email User email
   * @returns User or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    const prisma = getPrismaClient();
    return prisma.user.findUnique({
      where: { email },
    });
  },

  /**
   * Find a user by ID
   * @param id User ID
   * @returns User or null if not found
   */
  async findById(id: string): Promise<User | null> {
    const prisma = getPrismaClient();
    return prisma.user.findUnique({
      where: { id },
    });
  },

  /**
   * Create a new user
   * @param userData User data
   * @returns Created user
   */
  async create(userData: {
    name: string;
    email: string;
    password: string;
    role?: 'USER' | 'ADMIN';
  }): Promise<User> {
    const prisma = getPrismaClient();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });
  },

  /**
   * Update a user
   * @param id User ID
   * @param userData User data to update
   * @returns Updated user
   */
  async update(id: string, userData: Partial<User>): Promise<User> {
    const prisma = getPrismaClient();
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  },

  /**
   * Delete a user
   * @param id User ID
   * @returns Deleted user
   */
  async delete(id: string): Promise<User> {
    const prisma = getPrismaClient();
    return prisma.user.delete({
      where: { id },
    });
  },

  /**
   * Get all users
   * @returns Array of users
   */
  async getAll(): Promise<User[]> {
    const prisma = getPrismaClient();
    return prisma.user.findMany();
  },

  /**
   * Verify user password
   * @param user User object
   * @param password Password to verify
   * @returns Boolean indicating if password is correct
   */
  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  },
}; 