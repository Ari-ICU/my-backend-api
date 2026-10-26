const Product = require('../models/product.model');

async function createProduct(data) {
  return await Product.create(data);
}

async function getAllProducts(filter = {}, sort = { created_at: -1 }) {
  return await Product.find(filter)
    .populate('category_id', 'name slug')
    .sort(sort);
}

async function getProductById(id) {
  return await Product.findById(id).populate('category_id', 'name slug');
}

async function getProductBySlug(slug) {
  return await Product.findOne({ slug }).populate('category_id', 'name slug');
}

async function updateProduct(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

async function addProductImage(productId, imageData) {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');
  
  if (imageData.is_primary) {
    product.images.forEach(img => img.is_primary = false);
  }
  product.images.push(imageData);
  await product.save();
  return product;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  addProductImage
};
