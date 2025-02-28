import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting Prisma database initialization...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log('Admin user created:', admin.id);

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        name: 'Regular User',
        email: 'user@example.com',
        password: userPassword,
        role: 'USER',
      },
    });
    console.log('Regular user created:', user.id);

    // Create a sample loan for the user
    const loan = await prisma.loan.create({
      data: {
        userId: user.id,
        amount: 10000,
        interestRate: 5.5,
        term: 12,
        purpose: 'Home Renovation',
        collateral: 'Property',
        collateralValue: 50000,
        status: 'APPROVED',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)),
      },
    });
    console.log('Sample loan created:', loan.id);

    // Create a sample payment for the loan
    const payment = await prisma.payment.create({
      data: {
        loanId: loan.id,
        userId: user.id,
        amount: 875.5,
        paymentDate: new Date(),
        paymentMethod: 'CREDIT_CARD',
        status: 'COMPLETED',
        notes: 'First payment',
      },
    });
    console.log('Sample payment created:', payment.id);

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error during database initialization:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 