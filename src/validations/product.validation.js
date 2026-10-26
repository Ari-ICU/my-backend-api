const { z } = require('zod');

const productImageSchema = z.object({
  image_url: z.string().url('Must be a valid image URL'),
  alt_text: z.string().optional(),
  is_primary: z.boolean().default(false).optional(),
  sort_order: z.number().int().default(0).optional()
});

const createProductSchema = z.object({
  category_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Category ObjectId').optional(),
  name: z.string().min(2, 'Product name is required').max(255),
  slug: z.string().max(280).optional(),
  description: z.string().optional(),
  sku: z.string().min(2, 'SKU must be at least 2 characters').max(100),
  price: z.number().positive('Price must be greater than 0'),
  compare_at_price: z.number().positive().optional(),
  stock_quantity: z.number().int().min(0, 'Stock cannot be negative').default(0).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft').optional(),
  images: z.array(productImageSchema).optional()
});

const updateProductSchema = createProductSchema.partial();

module.exports = {
  createProductSchema,
  updateProductSchema,
  productImageSchema
};
