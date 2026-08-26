const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const authenticate = require('../middleware/auth.middleware');

router.use(authenticate);
router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
