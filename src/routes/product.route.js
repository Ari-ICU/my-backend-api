const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const validate = require('../validations/validate');
const { createProductSchema, updateProductSchema, productImageSchema } = require('../validations/product.validation');

router.route('/')
  .get(productController.getAllProducts)
  .post(validate(createProductSchema), productController.createProduct);

router.route('/:id')
  .get(productController.getProductById)
  .put(validate(updateProductSchema), productController.updateProduct)
  .delete(productController.deleteProduct);

router.route('/:id/images')
  .post(validate(productImageSchema), productController.addProductImage);

module.exports = router;
