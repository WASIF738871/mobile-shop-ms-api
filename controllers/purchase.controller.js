const purchaseService = require('../services/purchase.service');
const { sendResponse } = require('../utils/response');

const getPurchases = async (req, res, next) => {
  try {
    const purchases = await purchaseService.getPurchases();
    sendResponse(res, 200, 'Purchases retrieved successfully', purchases);
  } catch (error) {
    next(error);
  }
};

const createPurchase = async (req, res, next) => {
  try {
    const purchase = await purchaseService.createPurchase(req.body);
    sendResponse(res, 201, 'Purchase created successfully', purchase);
  } catch (error) {
    next(error);
  }
};

const updatePurchase = async (req, res, next) => {
  try {
    await purchaseService.updatePurchase(req.params.id, req.body);
    sendResponse(res, 200, 'Purchase updated successfully');
  } catch (error) {
    next(error);
  }
};

const deletePurchase = async (req, res, next) => {
  try {
    await purchaseService.deletePurchase(req.params.id);
    sendResponse(res, 200, 'Purchase deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
