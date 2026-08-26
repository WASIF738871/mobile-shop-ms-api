const purchaseRepository = require('../repositories/purchase.repository');

const getPurchases = async () => {
  return await purchaseRepository.findAll();
};

const createPurchase = async (purchaseData) => {
  return await purchaseRepository.create(purchaseData);
};

const updatePurchase = async (id, purchaseData) => {
  return await purchaseRepository.update(id, purchaseData);
};

const deletePurchase = async (id) => {
  return await purchaseRepository.remove(id);
};

module.exports = {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
