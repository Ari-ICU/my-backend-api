const { z } = require('zod');

const createCategorySchema = z.object({
  parent_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Parent Category ID').nullable().optional(),
  name: z.string().min(2, 'Category name must be at least 2 characters').max(150),
  slug: z.string().min(2).max(180).optional(),
  description: z.string().optional(),
  is_active: z.boolean().default(true).optional()
});

const updateCategorySchema = createCategorySchema.partial();

module.exports = {
  createCategorySchema,
  updateCategorySchema
};
