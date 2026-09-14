const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authenticate = require("../middleware/auth.middleware");

router.use(authenticate);
router.get("/with-stocks", productController.getProductsWithStocks);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
