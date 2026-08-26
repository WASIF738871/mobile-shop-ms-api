const paymentService = require('../services/payment.service');
const { sendResponse } = require('../utils/response');

const getPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getPayments();
    sendResponse(res, 200, 'Payments retrieved successfully', payments);
  } catch (error) {
    next(error);
  }
};

const createPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    sendResponse(res, 201, 'Payment created successfully', payment);
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    await paymentService.updatePayment(req.params.id, req.body);
    sendResponse(res, 200, 'Payment updated successfully');
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    await paymentService.deletePayment(req.params.id);
    sendResponse(res, 200, 'Payment deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
};
