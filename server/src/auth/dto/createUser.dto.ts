import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  name: z
    .string()
    .nonempty('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must not exceed 20 characters')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  phone: z.string().optional(),
  brandName: z.string().optional(),
  address: z.string().optional(),
  gstNumber: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
