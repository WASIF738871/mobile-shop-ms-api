const salesService = require('../services/sales.service');
const { sendResponse } = require('../utils/response');

const createSale = async (req, res, next) => {
  try {
    const sale = await salesService.createSale(req.body);
    sendResponse(res, 201, 'Sale created successfully', sale);
  } catch (error) {
    next(error);
  }
};

const getSales = async (req, res, next) => {
  try {
    const sales = await salesService.getAllSales();
    sendResponse(res, 200, 'Sales retrieved successfully', sales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSale,
  getSales,
};
