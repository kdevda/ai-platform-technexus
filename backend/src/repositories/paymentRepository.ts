import { Payment, Prisma } from '@prisma/client';
import { getPrismaClient } from '../services/postgresDbService';

/**
 * Repository for payment operations using PostgreSQL
 */
export const paymentRepository = {
  /**
   * Find a payment by ID
   * @param id Payment ID
   * @returns Payment or null if not found
   */
  async findById(id: string): Promise<Payment | null> {
    const prisma = getPrismaClient();
    return prisma.payment.findUnique({
      where: { id },
      include: {
        loan: true,
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
   * Find payments by loan ID
   * @param loanId Loan ID
   * @returns Array of payments
   */
  async findByLoanId(loanId: string): Promise<Payment[]> {
    const prisma = getPrismaClient();
    return prisma.payment.findMany({
      where: { loanId },
      orderBy: {
        paymentDate: 'desc',
      },
    });
  },

  /**
   * Find payments by user ID
   * @param userId User ID
   * @returns Array of payments
   */
  async findByUserId(userId: string): Promise<Payment[]> {
    const prisma = getPrismaClient();
    return prisma.payment.findMany({
      where: { userId },
      include: {
        loan: true,
      },
      orderBy: {
        paymentDate: 'desc',
      },
    });
  },

  /**
   * Create a new payment
   * @param paymentData Payment data
   * @returns Created payment
   */
  async create(paymentData: {
    loanId: string;
    userId: string;
    amount: number;
    paymentDate: Date;
    paymentMethod: string;
    status?: string;
    notes?: string;
  }): Promise<Payment> {
    const prisma = getPrismaClient();
    return prisma.payment.create({
      data: {
        loanId: paymentData.loanId,
        userId: paymentData.userId,
        amount: paymentData.amount,
        paymentDate: paymentData.paymentDate,
        paymentMethod: paymentData.paymentMethod,
        status: paymentData.status || 'pending',
        notes: paymentData.notes,
        updatedAt: new Date(),
      },
      include: {
        loan: true,
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
   * Update a payment
   * @param id Payment ID
   * @param paymentData Payment data to update
   * @returns Updated payment
   */
  async update(id: string, paymentData: Partial<Payment>): Promise<Payment> {
    const prisma = getPrismaClient();
    return prisma.payment.update({
      where: { id },
      data: paymentData,
    });
  },

  /**
   * Delete a payment
   * @param id Payment ID
   * @returns Deleted payment
   */
  async delete(id: string): Promise<Payment> {
    const prisma = getPrismaClient();
    return prisma.payment.delete({
      where: { id },
    });
  },

  /**
   * Get all payments
   * @returns Array of payments
   */
  async getAll(): Promise<Payment[]> {
    const prisma = getPrismaClient();
    return prisma.payment.findMany({
      include: {
        loan: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        paymentDate: 'desc',
      },
    });
  },

  /**
   * Update payment status
   * @param id Payment ID
   * @param status New status
   * @returns Updated payment
   */
  async updateStatus(id: string, status: string): Promise<Payment> {
    const prisma = getPrismaClient();
    return prisma.payment.update({
      where: { id },
      data: { status },
    });
  },
}; 