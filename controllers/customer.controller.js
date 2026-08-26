const customerService = require('../services/customer.service');
const { sendResponse } = require('../utils/response');

const getCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.getCustomers();
    sendResponse(res, 200, 'Customers retrieved successfully', customers);
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    sendResponse(res, 201, 'Customer created successfully', customer);
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    await customerService.updateCustomer(req.params.id, req.body);
    sendResponse(res, 200, 'Customer updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    await customerService.deleteCustomer(req.params.id);
    sendResponse(res, 200, 'Customer deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
