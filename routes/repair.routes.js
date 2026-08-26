const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repair.controller');
const authenticate = require('../middleware/auth.middleware');

router.use(authenticate);
router.get('/', repairController.getRepairs);
router.post('/', repairController.createRepair);
router.put('/:id', repairController.updateRepair);
router.delete('/:id', repairController.deleteRepair);

module.exports = router;
