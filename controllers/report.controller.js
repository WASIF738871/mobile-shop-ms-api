const reportService = require('../services/report.service');
const { sendResponse } = require('../utils/response');

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await reportService.getDashboardStats();
    sendResponse(res, 200, 'Dashboard stats retrieved', stats);
  } catch (error) {
    next(error);
  }
};

const getProfitLoss = async (req, res, next) => {
  try {
    const report = await reportService.getProfitLoss();
    sendResponse(res, 200, 'Profit and loss report retrieved', report);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getProfitLoss,
};
