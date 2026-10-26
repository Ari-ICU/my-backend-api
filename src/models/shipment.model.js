const { Schema, model } = require('mongoose');

const shipmentSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  carrier: { type: String },
  tracking_number: { type: String },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'in_transit', 'delivered', 'cancelled']
  },
  shipped_at: { type: Date },
  delivered_at: { type: Date }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Shipment = model('Shipment', shipmentSchema);

module.exports = Shipment;
