const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/permission.middleware');
const { PERMISSIONS } = require('../constants/permissions');

// ONLY SUPER ADMIN can view, create, update, delete users
router.use(authenticate);
router.use(authorize(PERMISSIONS.USERS_VIEW));

router.get('/', (req, res) => res.json({ success: true, data: [] })); // Placeholder

module.exports = router;
