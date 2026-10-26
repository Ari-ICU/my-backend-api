const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
  product_name: { type: String, required: true },
  sku: { type: String, required: true },
  unit_price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  line_total: { type: Number, required: true, min: 0 }
});

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address_id: { type: Schema.Types.ObjectId },
  order_number: { type: String, required: true, unique: true },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  },
  subtotal: { type: Number, required: true, min: 0 },
  shipping_fee: { type: Number, default: 0, min: 0 },
  discount_amount: { type: Number, default: 0, min: 0 },
  total_amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  shipping_address_snapshot: { type: Schema.Types.Mixed, required: true },
  notes: { type: String },
  items: [orderItemSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Order = model('Order', orderSchema);

module.exports = Order;
