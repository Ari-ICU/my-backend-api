const Wishlist = require('../models/wishlist.model');

async function addToWishlist(userId, productId) {
  return await Wishlist.findOneAndUpdate(
    { user_id: userId, product_id: productId },
    { user_id: userId, product_id: productId },
    { upsert: true, new: true }
  ).populate('product_id');
}

async function getUserWishlist(userId) {
  return await Wishlist.find({ user_id: userId })
    .populate('product_id')
    .sort({ created_at: -1 });
}

async function removeFromWishlist(userId, productId) {
  return await Wishlist.findOneAndDelete({ user_id: userId, product_id: productId });
}

module.exports = {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist
};
