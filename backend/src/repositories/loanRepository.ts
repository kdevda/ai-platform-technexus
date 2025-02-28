import { Loan, Prisma } from '@prisma/client';
import { getPrismaClient } from '../services/postgresDbService';

/**
 * Repository for loan operations using PostgreSQL
 */
export const loanRepository = {
  /**
   * Find a loan by ID
   * @param id Loan ID
   * @returns Loan or null if not found
   */
  async findById(id: string): Promise<Loan | null> {
    const prisma = getPrismaClient();
    return prisma.loan.findUnique({
      where: { id },
      include: {
        payments: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  },

  /**
   * Find loans by user ID
   * @param userId User ID
   * @returns Array of loans
   */
  async findByUserId(userId: string): Promise<Loan[]> {
    const prisma = getPrismaClient();
    return prisma.loan.findMany({
      where: { userId },
      include: {
        payments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  /**
   * Create a new loan
   * @param loanData Loan data
   * @returns Created loan
   */
  async create(loanData: {
    userId: string;
    amount: number;
    interestRate: number;
    term: number;
    purpose: string;
    collateral?: string;
    collateralValue?: number;
    status?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Loan> {
    const prisma = getPrismaClient();
    return prisma.loan.create({
      data: {
        ...loanData,
        status: loanData.status || 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  /**
   * Update a loan
   * @param id Loan ID
   * @param loanData Loan data to update
   * @returns Updated loan
   */
  async update(id: string, loanData: Partial<Loan>): Promise<Loan> {
    const prisma = getPrismaClient();
    return prisma.loan.update({
      where: { id },
      data: loanData,
      include: {
        payments: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  /**
   * Delete a loan
   * @param id Loan ID
   * @returns Deleted loan
   */
  async delete(id: string): Promise<Loan> {
    const prisma = getPrismaClient();
    return prisma.loan.delete({
      where: { id },
    });
  },

  /**
   * Get all loans
   * @returns Array of loans
   */
  async getAll(): Promise<Loan[]> {
    const prisma = getPrismaClient();
    return prisma.loan.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        payments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  /**
   * Update loan status
   * @param id Loan ID
   * @param status New status
   * @returns Updated loan
   */
  async updateStatus(id: string, status: string): Promise<Loan> {
    const prisma = getPrismaClient();
    return prisma.loan.update({
      where: { id },
      data: { status },
    });
  },
}; 