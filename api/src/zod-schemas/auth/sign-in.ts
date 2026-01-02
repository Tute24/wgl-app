import z from 'zod';

export const signInBodySchema = z
  .object({
    email: z.email({ message: 'Enter a valid e-mail address.' }),
    password: z.string(),
  })
  .strict();
