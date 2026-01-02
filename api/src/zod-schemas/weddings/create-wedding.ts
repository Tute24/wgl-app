import z from 'zod';
import { createGiftsSchema } from '../gifts/create-gifts.js';

export const createWeddingSchema = z
  .object({
    weddingTitle: z.string({ message: 'The title must be a string.' }),
    weddingDate: z.string({ message: 'Enter a valid date.' }),
    shippingAddress: z.string({ message: 'Enter a valid address.' }).optional(),
    gifts: createGiftsSchema,
  })
  .strict();
