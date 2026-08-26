const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');
const authenticate = require('../middleware/auth.middleware');

router.use(authenticate);
router.get('/', supplierController.getSuppliers);
router.post('/', supplierController.createSupplier);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
