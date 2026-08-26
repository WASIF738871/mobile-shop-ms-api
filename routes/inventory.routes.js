const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const authenticate = require('../middleware/auth.middleware');

router.use(authenticate);
router.get('/movements', inventoryController.getMovements);
router.post('/adjust', inventoryController.createMovement);

module.exports = router;
