const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const validate = require('../validations/validate');
const { addToCartSchema, updateCartItemSchema } = require('../validations/cart.validation');

router.route('/:userId')
  .get(cartController.getCart)
  .post(validate(addToCartSchema), cartController.addToCart)
  .delete(cartController.clearCart);

router.route('/:userId/items/:productId')
  .put(validate(updateCartItemSchema), cartController.updateCartItem)
  .delete(cartController.removeFromCart);

module.exports = router;
