const productService = require('../services/product.service');
const { sendResponse } = require('../utils/response');

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query.category);
    sendResponse(res, 200, 'Products retrieved successfully', products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    sendResponse(res, 201, 'Product created successfully', product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    sendResponse(res, 200, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    sendResponse(res, 200, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
