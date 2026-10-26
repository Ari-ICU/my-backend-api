const { z } = require('zod');

const addToCartSchema = z.object({
  product_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').default(1).optional()
});

const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity cannot be negative')
});

module.exports = {
  addToCartSchema,
  updateCartItemSchema
};
