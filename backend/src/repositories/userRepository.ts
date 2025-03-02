import { User, Prisma } from '@prisma/client';
import { getPrismaClient } from '../services/postgresDbService';
import bcrypt from 'bcryptjs';

// Define a type for Role since we're using it in our code
type Role = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// Define a type for user with roles
export type UserWithRoles = User & {
  userRoles: {
    role: Role;
  }[];
};

/**
 * Repository for user operations using PostgreSQL
 */
export const userRepository = {
  /**
   * Find a user by email
   * @param email User email
   * @returns User or null if not found
   */
  async findByEmail(email: string): Promise<UserWithRoles | null> {
    const prisma = getPrismaClient();
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    });
    
    return user as UserWithRoles | null;
  },

  /**
   * Find a user by ID
   * @param id User ID
   * @returns User or null if not found
   */
  async findById(id: string): Promise<UserWithRoles | null> {
    const prisma = getPrismaClient();
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    });
    
    return user as UserWithRoles | null;
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
    try {
      const prisma = getPrismaClient();
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      console.log('Creating user with data:', { 
        name: userData.name, 
        email: userData.email, 
        role: userData.role || 'USER' 
      });
      
      // Create the user
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role || 'USER', // Keep for backward compatibility
        },
      });

      // Find the role
      const role = await prisma.role.findUnique({
        where: { name: userData.role || 'USER' }
      });

      // If role exists, assign it to the user
      if (role) {
        await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: role.id
          }
        });
      }

      return user;
    } catch (error) {
      console.error('Error creating user in repository:', error);
      throw error;
    }
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
  async getAll(): Promise<UserWithRoles[]> {
    const prisma = getPrismaClient();
    const users = await prisma.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    });
    
    return users as UserWithRoles[];
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

  /**
   * Check if a user has a specific role
   * @param user User with roles
   * @param roleName Role name to check
   * @returns Boolean indicating if user has the role
   */
  hasRole(user: UserWithRoles, roleName: string): boolean {
    // First check the legacy role field for backward compatibility
    if (user.role.toUpperCase() === roleName.toUpperCase()) {
      return true;
    }
    
    // Then check the new role system
    return user.userRoles.some(ur => ur.role.name.toUpperCase() === roleName.toUpperCase());
  },

  /**
   * Assign a role to a user
   * @param userId User ID
   * @param roleName Role name
   */
  async assignRole(userId: string, roleName: string): Promise<void> {
    const prisma = getPrismaClient();
    
    // Find the role
    const role = await prisma.role.findUnique({
      where: { name: roleName.toUpperCase() }
    });

    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    // Check if the user already has this role
    const existingUserRole = await prisma.userRole.findFirst({
      where: {
        userId,
        roleId: role.id
      }
    });

    if (!existingUserRole) {
      // Assign the role
      await prisma.userRole.create({
        data: {
          userId,
          roleId: role.id
        }
      });
    }
  },

  /**
   * Remove a role from a user
   * @param userId User ID
   * @param roleName Role name
   */
  async removeRole(userId: string, roleName: string): Promise<void> {
    const prisma = getPrismaClient();
    
    // Find the role
    const role = await prisma.role.findUnique({
      where: { name: roleName.toUpperCase() }
    });

    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    // Remove the role
    await prisma.userRole.deleteMany({
      where: {
        userId,
        roleId: role.id
      }
    });
  },

  /**
   * Get all roles for a user
   * @param userId User ID
   * @returns Array of roles
   */
  async getUserRoles(userId: string): Promise<Role[]> {
    const prisma = getPrismaClient();
    
    const userRoles = await prisma.userRole.findMany({
      where: { userId },
      include: { role: true }
    });

    return userRoles.map(ur => ur.role);
  }
}; 