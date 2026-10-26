const productService = require('../services/product.service');
const AppError = require('../exceptions/appError');
const { ProductResponseDTO } = require('../dto');

async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      data: ProductResponseDTO.fromEntity(product)
    });
  } catch (error) {
    next(error);
  }
}

async function getAllProducts(req, res, next) {
  try {
    const filter = {};
    if (req.query.category_id) filter.category_id = req.query.category_id;
    if (req.query.status) filter.status = req.query.status;
    
    const products = await productService.getAllProducts(filter);
    res.status(200).json({
      success: true,
      data: ProductResponseDTO.fromEntities(products)
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return next(new AppError('Product not found', 404));
    res.status(200).json({
      success: true,
      data: ProductResponseDTO.fromEntity(product)
    });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) return next(new AppError('Product not found', 404));
    res.status(200).json({
      success: true,
      data: ProductResponseDTO.fromEntity(product)
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return next(new AppError('Product not found', 404));
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function addProductImage(req, res, next) {
  try {
    const product = await productService.addProductImage(req.params.id, req.body);
    res.status(201).json({
      success: true,
      data: ProductResponseDTO.fromEntity(product)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductImage
};
