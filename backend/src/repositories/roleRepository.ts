import { Role, PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../services/postgresDbService';

export const roleRepository = {
  /**
   * Get all roles
   * @returns Array of roles
   */
  async getAll(): Promise<Role[]> {
    const prisma = getPrismaClient();
    return prisma.role.findMany({
      include: {
        userRoles: {
          select: {
            userId: true
          }
        }
      }
    });
  },

  /**
   * Get role by ID
   * @param id Role ID
   * @returns Role or null if not found
   */
  async findById(id: string): Promise<Role | null> {
    const prisma = getPrismaClient();
    return prisma.role.findUnique({
      where: { id },
      include: {
        userRoles: {
          select: {
            userId: true
          }
        }
      }
    });
  },

  /**
   * Get role by name
   * @param name Role name
   * @returns Role or null if not found
   */
  async findByName(name: string): Promise<Role | null> {
    const prisma = getPrismaClient();
    return prisma.role.findUnique({
      where: { name },
      include: {
        userRoles: {
          select: {
            userId: true
          }
        }
      }
    });
  },

  /**
   * Create a new role
   * @param data Role data
   * @returns Created role
   */
  async create(data: { name: string; description?: string }): Promise<Role> {
    const prisma = getPrismaClient();
    return prisma.role.create({
      data
    });
  },

  /**
   * Update a role
   * @param id Role ID
   * @param data Role data to update
   * @returns Updated role
   */
  async update(id: string, data: { name?: string; description?: string }): Promise<Role> {
    const prisma = getPrismaClient();
    return prisma.role.update({
      where: { id },
      data
    });
  },

  /**
   * Delete a role
   * @param id Role ID
   * @returns Deleted role
   */
  async delete(id: string): Promise<Role> {
    const prisma = getPrismaClient();
    return prisma.role.delete({
      where: { id }
    });
  }
}; 