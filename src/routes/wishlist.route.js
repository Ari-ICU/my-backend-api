const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.route('/:userId')
  .get(wishlistController.getUserWishlist)
  .post(wishlistController.addToWishlist);

router.route('/:userId/products/:productId')
  .delete(wishlistController.removeFromWishlist);

module.exports = router;
