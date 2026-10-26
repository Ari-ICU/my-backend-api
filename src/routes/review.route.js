const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

router.route('/')
  .post(reviewController.createReview);

router.route('/product/:productId')
  .get(reviewController.getProductReviews);

router.route('/:id')
  .delete(reviewController.deleteReview);

module.exports = router;
