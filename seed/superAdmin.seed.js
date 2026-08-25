const { getDB } = require('../config/database');
const logger = require('../utils/logger');
const { hashPassword } = require('../utils/password');

const seedSuperAdmin = async () => {
  const db = getDB();
  const email = 'admin@example.com';
  const password = 'adminPassword123!';

  const adminRole = await db.collection('roles').findOne({ name: 'SUPER_ADMIN' });
  
  const passwordHash = await hashPassword(password);

  const admin = {
    name: 'Super Admin',
    email,
    passwordHash,
    roleIds: [adminRole._id],
    status: 'ACTIVE',
    createdAt: new Date(),
  };

  try {
    await db.collection('users').deleteMany({ email });
    await db.collection('users').insertOne(admin);
    logger.info('Super Admin seeded successfully.');
  } catch (error) {
    logger.error('Error seeding Super Admin:', error);
  }
};

module.exports = seedSuperAdmin;
