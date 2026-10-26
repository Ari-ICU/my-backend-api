const wishlistService = require('../services/wishlist.service');

async function addToWishlist(req, res) {
  try {
    const { product_id } = req.body;
    const item = await wishlistService.addToWishlist(req.params.userId, product_id);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function getUserWishlist(req, res) {
  try {
    const wishlist = await wishlistService.getUserWishlist(req.params.userId);
    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function removeFromWishlist(req, res) {
  try {
    await wishlistService.removeFromWishlist(req.params.userId, req.params.productId);
    res.status(200).json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist
};
