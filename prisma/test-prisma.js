const { PrismaClient } = require('@prisma/client');

async function testPrisma() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');

    // Try to create a test user with resetToken
    const testEmail = `test-${Date.now()}@example.com`;
    
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: testEmail,
        password: 'test123', // In a real app, this should be hashed
        resetToken: 'test-token',
        resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour from now
      },
    });

    console.log('✅ Successfully created test user with reset token');
    console.log(user);

    // Try to find the user by resetToken
    const foundUser = await prisma.user.findFirst({
      where: {
        resetToken: 'test-token',
      },
    });

    console.log('\n🔍 Found user by reset token:');
    console.log(foundUser);

    // Clean up
    await prisma.user.deleteMany({
      where: {
        email: testEmail,
      },
    });
    console.log('\n🧹 Cleaned up test user');

  } catch (error) {
    console.error('❌ Error testing Prisma Client:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
