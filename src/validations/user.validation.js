const { z } = require('zod');

const createUserSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters').max(150),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  password_hash: z.string().optional(),
  phone: z.string().max(30).optional(),
  role: z.enum(['customer', 'admin']).default('customer').optional(),
  is_active: z.boolean().default(true).optional()
}).refine(data => data.password || data.password_hash, {
  message: 'Either password or password_hash is required',
  path: ['password']
});

const updateUserSchema = z.object({
  full_name: z.string().min(2).max(150).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(30).optional(),
  role: z.enum(['customer', 'admin']).optional(),
  is_active: z.boolean().optional()
});

const addressSchema = z.object({
  recipient_name: z.string().min(2, 'Recipient name is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  address_line: z.string().min(3, 'Address line is required'),
  city: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().default('Cambodia').optional(),
  is_default: z.boolean().default(false).optional()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  addressSchema
};
