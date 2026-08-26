const inventoryRepository = require('../repositories/inventory.repository');

const getMovements = async () => {
  return await inventoryRepository.findAllMovements();
};

const createMovement = async (movementData) => {
  return await inventoryRepository.createMovement(movementData);
};

module.exports = {
  getMovements,
  createMovement,
};
