const { getDB } = require('../config/database');

const auditLog = async (req, action, module, entityId, oldData = null, newData = null) => {
  const db = getDB();
  const logEntry = {
    userId: req.user ? req.user.userId : null,
    action,
    module,
    entityId,
    oldData,
    newData,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
    createdAt: new Date(),
  };

  await db.collection('auditLogs').insertOne(logEntry);
};

module.exports = auditLog;
