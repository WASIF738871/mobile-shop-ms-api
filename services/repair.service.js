const repairRepository = require('../repositories/repair.repository');

const getRepairs = async () => {
  return await repairRepository.findAll();
};

const createRepair = async (repairData) => {
  return await repairRepository.create(repairData);
};

const updateRepair = async (id, repairData) => {
  return await repairRepository.update(id, repairData);
};

const deleteRepair = async (id) => {
  return await repairRepository.remove(id);
};

module.exports = {
  getRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
};
