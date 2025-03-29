import { z } from 'zod';

export const updateUserSchema = z.object({
  role: z.string().optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
