const Cart = require('../models/cart.model');
const AppError = require('../exceptions/appError');

async function getCartByUserId(userId) {
  let cart = await Cart.findOne({ user_id: userId }).populate('items.product_id');
  if (!cart) {
    cart = await Cart.create({ user_id: userId, items: [] });
  }
  return cart;
}

async function addToCart(userId, productId, quantity = 1) {
  let cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    cart = await Cart.create({ user_id: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    item => item.product_id.toString() === productId.toString()
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += Number(quantity);
  } else {
    cart.items.push({ product_id: productId, quantity: Number(quantity) });
  }

  await cart.save();
  return await cart.populate('items.product_id');
}

async function updateCartItemQuantity(userId, productId, quantity) {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) throw new AppError('Cart not found for this user', 404);

  const itemIndex = cart.items.findIndex(
    item => item.product_id.toString() === productId.toString()
  );

  if (itemIndex === -1) throw new AppError('Item not found in cart', 404);

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();
  return await cart.populate('items.product_id');
}

async function removeFromCart(userId, productId) {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) throw new AppError('Cart not found for this user', 404);

  cart.items = cart.items.filter(
    item => item.product_id.toString() !== productId.toString()
  );

  await cart.save();
  return await cart.populate('items.product_id');
}

async function clearCart(userId) {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) throw new AppError('Cart not found for this user', 404);

  cart.items = [];
  await cart.save();
  return cart;
}

module.exports = {
  getCartByUserId,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
};
