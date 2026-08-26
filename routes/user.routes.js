const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/permission.middleware');
const { PERMISSIONS } = require('../constants/permissions');

// ONLY SUPER ADMIN can view, create, update, delete users
router.use(authenticate);
router.use(authorize(PERMISSIONS.USERS_VIEW));

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
