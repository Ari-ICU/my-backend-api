const { z } = require('zod');

const orderItemSchema = z.object({
  product_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID').optional(),
  product_name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  unit_price: z.number().positive('Unit price must be positive'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  line_total: z.number().positive('Line total must be positive')
});

const createOrderSchema = z.object({
  user_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID'),
  address_id: z.string().optional(),
  order_number: z.string().optional(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).default('pending').optional(),
  subtotal: z.number().min(0),
  shipping_fee: z.number().min(0).default(0).optional(),
  discount_amount: z.number().min(0).default(0).optional(),
  total_amount: z.number().positive('Total amount must be greater than 0'),
  currency: z.string().length(3).default('USD').optional(),
  shipping_address_snapshot: z.record(z.any()),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item')
});

const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema
};
