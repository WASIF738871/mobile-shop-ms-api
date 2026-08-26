const supplierService = require('../services/supplier.service');
const { sendResponse } = require('../utils/response');

const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierService.getSuppliers();
    sendResponse(res, 200, 'Suppliers retrieved successfully', suppliers);
  } catch (error) {
    next(error);
  }
};

const createSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    sendResponse(res, 201, 'Supplier created successfully', supplier);
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    await supplierService.updateSupplier(req.params.id, req.body);
    sendResponse(res, 200, 'Supplier updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    await supplierService.deleteSupplier(req.params.id);
    sendResponse(res, 200, 'Supplier deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
