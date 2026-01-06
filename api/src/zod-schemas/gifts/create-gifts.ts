import z from 'zod';

export const createGiftsSchema = z.array(
  z
    .object({
      productName: z.string({ message: 'Enter a valid name.' }),
      productLink: z.string({ message: 'Enter a valid link.' }),
      quantity: z.number({ message: 'Quantity must be a number.' }),
    })
    .strict(),
);

export const createGiftsWithWeddingIdSchema = z
  .object({
    weddingId: z.number(),
    gifts: createGiftsSchema,
  })
  .strict();
