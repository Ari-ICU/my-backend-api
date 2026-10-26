const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

wishlistSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;
