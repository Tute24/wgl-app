import z from 'zod';

export const updateGiftDataStructSchema = z.object({
  productName: z.string({ message: 'Enter a valid name.' }).optional(),
  productLink: z.string({ message: 'Enter a valid link.' }).optional(),
  quantity: z
    .number({ message: 'Quantity must be a number.' })
    .int({ message: 'Quantity must be an integer' })
    .min(0, { message: 'Quantity must be 0 or greater.' })
    .optional(),
});

export const updateGiftDataSchema = z.object({
  giftId: z.number(),
  updateData: updateGiftDataStructSchema,
});
