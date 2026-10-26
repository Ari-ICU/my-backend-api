class CartResponseDTO {
  constructor(cart) {
    this.id = cart._id || cart.id;
    this.user_id = cart.user_id;
    this.items = (cart.items || []).map(item => {
      const product = item.product_id && typeof item.product_id === 'object' ? item.product_id : null;
      const unitPrice = product ? product.price : 0;
      const lineTotal = Number((unitPrice * item.quantity).toFixed(2));

      return {
        product_id: product ? (product._id || product.id) : item.product_id,
        name: product ? product.name : null,
        sku: product ? product.sku : null,
        price: unitPrice,
        image_url: product && product.images && product.images[0] ? product.images[0].image_url : null,
        quantity: item.quantity,
        line_total: lineTotal
      };
    });

    this.total_items = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.subtotal = Number(this.items.reduce((sum, item) => sum + item.line_total, 0).toFixed(2));
    this.updated_at = cart.updated_at;
  }

  static fromEntity(cart) {
    if (!cart) return null;
    return new CartResponseDTO(cart);
  }
}

module.exports = {
  CartResponseDTO
};
