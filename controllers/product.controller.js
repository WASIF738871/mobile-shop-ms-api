const productService = require("../services/product.service");
const { sendResponse } = require("../utils/response");

exports.getProductsWithStocks = async (req, res, next) => {
  try {
    const products = await productService.getProductsWithStocks(req.query.category, req.query.status);
    sendResponse(res, 200, "Products retrieved successfully", products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    sendResponse(res, 201, "Product created successfully", product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    sendResponse(res, 200, "Product updated successfully");
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    sendResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};
