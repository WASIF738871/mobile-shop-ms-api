const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const authenticate = require('../middleware/auth.middleware');

router.use(authenticate);
router.get('/dashboard-stats', reportController.getDashboardStats);
router.get('/profit-loss', reportController.getProfitLoss);

module.exports = router;
