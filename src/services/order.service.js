const Order = require('../models/order.model');
const { randomUUID } = require('crypto');

async function createOrder(data) {
  if (!data.order_number) {
    data.order_number = `ORD-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  }
  return await Order.create(data);
}

async function getAllOrders(filter = {}) {
  return await Order.find(filter)
    .populate('user_id', 'full_name email')
    .sort({ created_at: -1 });
}

async function getOrderById(id) {
  return await Order.findById(id).populate('user_id', 'full_name email phone');
}

async function getUserOrders(userId) {
  return await Order.find({ user_id: userId }).sort({ created_at: -1 });
}

async function updateOrderStatus(id, status) {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus
};
