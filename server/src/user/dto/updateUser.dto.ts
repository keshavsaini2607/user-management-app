import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
  phone: z
    .string()
    .regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'Invalid Indian phone number')
    .optional(),

  country: z.string().optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
