class OrderResponseDTO {
  constructor(order) {
    this.id = order._id || order.id;
    this.order_number = order.order_number;
    this.status = order.status;
    this.customer = order.user_id && typeof order.user_id === 'object'
      ? {
          id: order.user_id._id || order.user_id.id,
          full_name: order.user_id.full_name,
          email: order.user_id.email
        }
      : { id: order.user_id };
    this.subtotal = order.subtotal;
    this.shipping_fee = order.shipping_fee;
    this.discount_amount = order.discount_amount;
    this.total_amount = order.total_amount;
    this.currency = order.currency;
    this.shipping_address = order.shipping_address_snapshot;
    this.notes = order.notes || '';
    this.items = (order.items || []).map(item => ({
      product_id: item.product_id,
      product_name: item.product_name,
      sku: item.sku,
      unit_price: item.unit_price,
      quantity: item.quantity,
      line_total: item.line_total
    }));
    this.items_count = (order.items || []).reduce((sum, item) => sum + item.quantity, 0);
    this.created_at = order.created_at;
  }

  static fromEntity(order) {
    if (!order) return null;
    return new OrderResponseDTO(order);
  }

  static fromEntities(orders = []) {
    return orders.map(order => new OrderResponseDTO(order));
  }
}

module.exports = {
  OrderResponseDTO
};
