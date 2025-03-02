import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting role initialization...');

  // Create default roles if they don't exist
  const roles = [
    { name: 'ADMIN', description: 'Administrator with full access' },
    { name: 'USER', description: 'Regular user with limited access' },
    { name: 'MANAGER', description: 'Manager with elevated access' },
    { name: 'SUPPORT', description: 'Support staff with customer service access' }
  ];

  for (const role of roles) {
    const existingRole = await prisma.role.findUnique({
      where: { name: role.name }
    });

    if (!existingRole) {
      await prisma.role.create({
        data: role
      });
      console.log(`Created role: ${role.name}`);
    } else {
      console.log(`Role ${role.name} already exists`);
    }
  }

  // Get all roles for reference
  const allRoles = await prisma.role.findMany();
  const roleMap = new Map(allRoles.map((role: { name: string; id: string }) => [role.name, role.id]));

  // Update existing users based on their current role field
  const users = await prisma.user.findMany();
  
  for (const user of users) {
    // Check if user already has roles assigned
    const existingUserRoles = await prisma.userRole.findMany({
      where: { userId: user.id }
    });

    if (existingUserRoles.length === 0) {
      // Map the old role string to the new role model
      const roleName = user.role.toUpperCase();
      const roleId = roleMap.get(roleName) || roleMap.get('USER');
      
      if (roleId) {
        await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: roleId
          }
        });
        console.log(`Assigned role ${roleName} to user ${user.email}`);
      } else {
        console.warn(`Could not find role for user ${user.email}, using default USER role`);
        const userRoleId = roleMap.get('USER');
        if (userRoleId) {
          await prisma.userRole.create({
            data: {
              userId: user.id,
              roleId: userRoleId
            }
          });
        }
      }
    } else {
      console.log(`User ${user.email} already has roles assigned`);
    }
  }

  console.log('Role initialization completed successfully');
}

main()
  .catch((e) => {
    console.error('Error during role initialization:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 