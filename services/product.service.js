const productRepository = require("../repositories/product.repository");

exports.getProductsWithStocks = async (category, status) => {
  const match = {};

  if (category) {
    match.category = category;
  }

  if (status) {
    match.status = status;
  }

  return await productRepository.getProductsWithStocks(match);
};

exports.createProduct = async (productData) => {
  return await productRepository.create(productData);
};

exports.updateProduct = async (id, productData) => {
  return await productRepository.update(id, productData);
};

exports.deleteProduct = async (id) => {
  return await productRepository.remove(id);
};
