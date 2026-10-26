const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const validate = require('../validations/validate');
const { createOrderSchema, updateOrderStatusSchema } = require('../validations/order.validation');

router.route('/')
  .get(orderController.getAllOrders)
  .post(validate(createOrderSchema), orderController.createOrder);

router.route('/:id')
  .get(orderController.getOrderById);

router.route('/:id/status')
  .patch(validate(updateOrderStatusSchema), orderController.updateOrderStatus);

router.route('/user/:userId')
  .get(orderController.getUserOrders);

module.exports = router;
