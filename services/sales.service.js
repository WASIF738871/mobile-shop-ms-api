const salesRepository = require('../repositories/sales.repository');

const createSale = async (saleData) => {
  // In a real app, you would validate stock and update inventory here
  return await salesRepository.create(saleData);
};

const getAllSales = async () => {
  return await salesRepository.findAll();
};

module.exports = {
  createSale,
  getAllSales,
};
