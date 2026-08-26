const supplierRepository = require('../repositories/supplier.repository');

const getSuppliers = async () => {
  return await supplierRepository.findAll();
};

const createSupplier = async (supplierData) => {
  return await supplierRepository.create(supplierData);
};

const updateSupplier = async (id, supplierData) => {
  return await supplierRepository.update(id, supplierData);
};

const deleteSupplier = async (id) => {
  return await supplierRepository.remove(id);
};

module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
