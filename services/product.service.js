const productRepository = require('../repositories/product.repository');

const getProducts = async (category) => {
  const query = category ? { category } : {};
  return await productRepository.findAll(query);
};

const createProduct = async (productData) => {
  return await productRepository.create(productData);
};

const updateProduct = async (id, productData) => {
  return await productRepository.update(id, productData);
};

const deleteProduct = async (id) => {
  return await productRepository.remove(id);
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
