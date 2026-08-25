const { getDB } = require('../config/database');
const logger = require('../utils/logger');
const { PERMISSIONS } = require('../constants/permissions');

const seedData = async () => {
  const db = getDB();

  // Seed Permissions
  const permissions = Object.values(PERMISSIONS).map((p) => ({
    name: p,
    createdAt: new Date(),
  }));

  try {
    await db.collection('permissions').deleteMany({});
    await db.collection('permissions').insertMany(permissions);
    logger.info('Permissions seeded successfully.');
  } catch (error) {
    logger.error('Error seeding permissions:', error);
  }
};

module.exports = seedData;
