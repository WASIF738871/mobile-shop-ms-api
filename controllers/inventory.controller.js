const inventoryService = require('../services/inventory.service');
const { sendResponse } = require('../utils/response');

const getMovements = async (req, res, next) => {
  try {
    const movements = await inventoryService.getMovements();
    sendResponse(res, 200, 'Movements retrieved successfully', movements);
  } catch (error) {
    next(error);
  }
};

const createMovement = async (req, res, next) => {
  try {
    const movement = await inventoryService.createMovement(req.body);
    sendResponse(res, 201, 'Movement created successfully', movement);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMovements,
  createMovement,
};
