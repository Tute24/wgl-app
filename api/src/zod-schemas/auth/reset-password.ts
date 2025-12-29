import z from 'zod';
import { passwordSchema } from './create-user.js';

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
    passwordResetToken: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Both passwords must be equal',
  });
