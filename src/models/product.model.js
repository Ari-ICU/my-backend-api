const { Schema, model } = require('mongoose');

const productImageSchema = new Schema({
  image_url: { type: String, required: true },
  alt_text: { type: String },
  is_primary: { type: Boolean, default: false },
  sort_order: { type: Number, default: 0 }
});

const productSchema = new Schema({
  category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String },
  sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  compare_at_price: { type: Number, min: 0 },
  stock_quantity: { type: Number, default: 0, min: 0 },
  status: { type: String, default: 'draft', enum: ['draft', 'published', 'archived'] },
  images: [productImageSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Product = model('Product', productSchema);

module.exports = Product;
