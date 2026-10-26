const orderService = require('../services/order.service');
const AppError = require('../exceptions/appError');
const { OrderResponseDTO } = require('../dto');

async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({
      success: true,
      data: OrderResponseDTO.fromEntity(order)
    });
  } catch (error) {
    next(error);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({
      success: true,
      data: OrderResponseDTO.fromEntities(orders)
    });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return next(new AppError('Order not found', 404));
    res.status(200).json({
      success: true,
      data: OrderResponseDTO.fromEntity(order)
    });
  } catch (error) {
    next(error);
  }
}

async function getUserOrders(req, res, next) {
  try {
    const orders = await orderService.getUserOrders(req.params.userId);
    res.status(200).json({
      success: true,
      data: OrderResponseDTO.fromEntities(orders)
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    if (!order) return next(new AppError('Order not found', 404));
    res.status(200).json({
      success: true,
      data: OrderResponseDTO.fromEntity(order)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus
};
