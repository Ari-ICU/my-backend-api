const cartService = require('../services/cart.service');
const { CartResponseDTO } = require('../dto');

async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCartByUserId(req.params.userId);
    res.status(200).json({
      success: true,
      data: CartResponseDTO.fromEntity(cart)
    });
  } catch (error) {
    next(error);
  }
}

async function addToCart(req, res, next) {
  try {
    const { product_id, quantity } = req.body;
    const cart = await cartService.addToCart(req.params.userId, product_id, quantity);
    res.status(200).json({
      success: true,
      data: CartResponseDTO.fromEntity(cart)
    });
  } catch (error) {
    next(error);
  }
}

async function updateCartItem(req, res, next) {
  try {
    const { quantity } = req.body;
    const cart = await cartService.updateCartItemQuantity(req.params.userId, req.params.productId, quantity);
    res.status(200).json({
      success: true,
      data: CartResponseDTO.fromEntity(cart)
    });
  } catch (error) {
    next(error);
  }
}

async function removeFromCart(req, res, next) {
  try {
    const cart = await cartService.removeFromCart(req.params.userId, req.params.productId);
    res.status(200).json({
      success: true,
      data: CartResponseDTO.fromEntity(cart)
    });
  } catch (error) {
    next(error);
  }
}

async function clearCart(req, res, next) {
  try {
    const cart = await cartService.clearCart(req.params.userId);
    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: CartResponseDTO.fromEntity(cart)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
