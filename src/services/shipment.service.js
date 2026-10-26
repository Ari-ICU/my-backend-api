const Shipment = require('../models/shipment.model');

async function createShipment(data) {
  return await Shipment.create(data);
}

async function getShipmentByOrderId(orderId) {
  return await Shipment.findOne({ order_id: orderId });
}

async function updateShipmentStatus(id, updateData) {
  return await Shipment.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

module.exports = {
  createShipment,
  getShipmentByOrderId,
  updateShipmentStatus
};
