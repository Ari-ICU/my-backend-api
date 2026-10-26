const Category = require('../models/category.model');

async function createCategory(data) {
  return await Category.create(data);
}

async function getAllCategories(filter = {}) {
  return await Category.find(filter).populate('parent_id', 'name slug');
}

async function getCategoryById(id) {
  return await Category.findById(id).populate('parent_id', 'name slug');
}

async function getCategoryBySlug(slug) {
  return await Category.findOne({ slug }).populate('parent_id', 'name slug');
}

async function updateCategory(id, data) {
  return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteCategory(id) {
  return await Category.findByIdAndDelete(id);
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory
};
