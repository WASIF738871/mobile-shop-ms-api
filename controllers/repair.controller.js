const repairService = require('../services/repair.service');
const { sendResponse } = require('../utils/response');

const getRepairs = async (req, res, next) => {
  try {
    const repairs = await repairService.getRepairs();
    sendResponse(res, 200, 'Repairs retrieved successfully', repairs);
  } catch (error) {
    next(error);
  }
};

const createRepair = async (req, res, next) => {
  try {
    const repair = await repairService.createRepair(req.body);
    sendResponse(res, 201, 'Repair created successfully', repair);
  } catch (error) {
    next(error);
  }
};

const updateRepair = async (req, res, next) => {
  try {
    await repairService.updateRepair(req.params.id, req.body);
    sendResponse(res, 200, 'Repair updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteRepair = async (req, res, next) => {
  try {
    await repairService.deleteRepair(req.params.id);
    sendResponse(res, 200, 'Repair deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
};
