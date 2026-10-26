const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
  recipient_name: { type: String, required: true },
  phone: { type: String, required: true },
  address_line: { type: String, required: true },
  city: { type: String },
  province: { type: String },
  postal_code: { type: String },
  country: { type: String, default: 'Cambodia' },
  is_default: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

const userSchema = new Schema({
  full_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password_hash: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: 'customer' },
  is_active: { type: Boolean, default: true },
  addresses: [addressSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = model('User', userSchema);

module.exports = User;
