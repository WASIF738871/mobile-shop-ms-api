const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

const checkPermission = async (userId, requiredPermission) => {
  const db = getDB();
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  if (!user) return false;

  const roles = await db.collection('roles').find({ _id: { $in: user.roleIds } }).toArray();
  const permissionIds = roles.flatMap(role => role.permissionIds);
  
  const permissions = await db.collection('permissions').find({ _id: { $in: permissionIds } }).toArray();
  return permissions.some(p => p.name === requiredPermission);
};

const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const isAuthorized = await checkPermission(req.user.userId, requiredPermission);
      if (!isAuthorized) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
