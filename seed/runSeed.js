const seedPermissions = require('./permissions.seed');
const seedRoles = require('./roles.seed');
const seedSuperAdmin = require('./superAdmin.seed');
const { connectDB, closeDB } = require('../config/database');
const logger = require('../utils/logger');

const runSeed = async () => {
  try {
    await connectDB();
    await seedPermissions();
    await seedRoles();
    await seedSuperAdmin();
    logger.info('Database seeded successfully.');
  } catch (error) {
    logger.error('Error seeding database:', error);
  } finally {
    await closeDB();
    process.exit();
  }
};

runSeed();
