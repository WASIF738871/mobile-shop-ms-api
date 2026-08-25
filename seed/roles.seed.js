const { getDB } = require('../config/database');
const logger = require('../utils/logger');
const { PERMISSIONS } = require('../constants/permissions');

const seedRoles = async () => {
  const db = getDB();

  const permissions = await db.collection('permissions').find().toArray();
  const permissionMap = permissions.reduce((acc, p) => ({ ...acc, [p.name]: p._id }), {});

  const roles = [
    {
      name: 'SUPER_ADMIN',
      description: 'Full system access',
      permissionIds: permissions.map(p => p._id),
      status: 'ACTIVE',
      createdAt: new Date(),
    },
    {
      name: 'SALES',
      description: 'POS operations',
      permissionIds: [
        permissionMap[PERMISSIONS.DASHBOARD_VIEW],
        permissionMap[PERMISSIONS.SALES_VIEW],
        permissionMap[PERMISSIONS.SALES_CREATE],
        permissionMap[PERMISSIONS.CUSTOMERS_VIEW],
      ],
      status: 'ACTIVE',
      createdAt: new Date(),
    }
  ];

  try {
    await db.collection('roles').deleteMany({});
    await db.collection('roles').insertMany(roles);
    logger.info('Roles seeded successfully.');
  } catch (error) {
    logger.error('Error seeding roles:', error);
  }
};

module.exports = seedRoles;
