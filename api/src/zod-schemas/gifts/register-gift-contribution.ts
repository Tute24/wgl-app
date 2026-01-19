import z from 'zod';

export const registerGiftContributionSchema = z
  .object({
    quantity: z
      .number({ message: 'Quantity must be a number.' })
      .int({ message: 'Quantity must be an integer' })
      .min(1, { message: 'Quantity must be greater than 0.' }),
  })
  .strict();
