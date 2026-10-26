const Review = require('../models/review.model');

async function createReview(data) {
  return await Review.create(data);
}

async function getProductReviews(productId) {
  return await Review.find({ product_id: productId })
    .populate('user_id', 'full_name')
    .sort({ created_at: -1 });
}

async function deleteReview(id) {
  return await Review.findByIdAndDelete(id);
}

module.exports = {
  createReview,
  getProductReviews,
  deleteReview
};
