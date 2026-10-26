const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  provider: { type: String, required: true },
  transaction_reference: { type: String },
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  paid_at: { type: Date }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Payment = model('Payment', paymentSchema);

module.exports = Payment;
