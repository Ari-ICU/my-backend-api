const Payment = require('../models/payment.model');

async function createPayment(data) {
  return await Payment.create(data);
}

async function getPaymentByOrderId(orderId) {
  return await Payment.find({ order_id: orderId });
}

async function updatePaymentStatus(id, status, paidAt = new Date()) {
  return await Payment.findByIdAndUpdate(
    id,
    { status, paid_at: status === 'completed' ? paidAt : undefined },
    { new: true, runValidators: true }
  );
}

module.exports = {
  createPayment,
  getPaymentByOrderId,
  updatePaymentStatus
};
