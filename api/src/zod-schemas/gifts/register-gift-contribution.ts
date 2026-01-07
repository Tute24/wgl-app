import z from 'zod';

export const registerGiftContributionSchema = z
  .object({
    weddingId: z.number(),
    quantity: z.number(),
    giftId: z.number(),
  })
  .strict();
