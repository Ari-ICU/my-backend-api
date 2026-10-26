class ProductResponseDTO {
  constructor(product) {
    this.id = product._id || product.id;
    this.name = product.name;
    this.slug = product.slug;
    this.sku = product.sku;
    this.description = product.description || '';
    this.price = product.price;
    this.compare_at_price = product.compare_at_price || null;
    this.discount_amount = product.compare_at_price && product.compare_at_price > product.price
      ? Number((product.compare_at_price - product.price).toFixed(2))
      : 0;
    this.stock_quantity = product.stock_quantity;
    this.is_in_stock = product.stock_quantity > 0;
    this.status = product.status;
    this.category = product.category_id && typeof product.category_id === 'object'
      ? {
          id: product.category_id._id || product.category_id.id,
          name: product.category_id.name,
          slug: product.category_id.slug
        }
      : product.category_id || null;
    this.images = (product.images || []).map(img => ({
      id: img._id || img.id,
      image_url: img.image_url,
      alt_text: img.alt_text || '',
      is_primary: img.is_primary,
      sort_order: img.sort_order
    }));
    this.created_at = product.created_at;
    this.updated_at = product.updated_at;
  }

  static fromEntity(product) {
    if (!product) return null;
    return new ProductResponseDTO(product);
  }

  static fromEntities(products = []) {
    return products.map(product => new ProductResponseDTO(product));
  }
}

module.exports = {
  ProductResponseDTO
};
