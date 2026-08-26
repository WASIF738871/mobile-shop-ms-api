const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');
const authenticate = require('../middleware/auth.middleware');

router.use(authenticate);
router.post('/', salesController.createSale);
router.get('/', salesController.getSales);

module.exports = router;
