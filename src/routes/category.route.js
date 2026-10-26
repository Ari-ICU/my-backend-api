const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const validate = require('../validations/validate');
const { createCategorySchema, updateCategorySchema } = require('../validations/category.validation');

router.route('/')
  .get(categoryController.getAllCategories)
  .post(validate(createCategorySchema), categoryController.createCategory);

router.route('/:id')
  .get(categoryController.getCategoryById)
  .put(validate(updateCategorySchema), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
