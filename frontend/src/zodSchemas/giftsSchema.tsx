import { z } from 'zod'

const giftsSchema = z.array(
  z.object({
    productName: z.string(),
    productLink: z.string(),
    quantity: z.number().int().positive(),
  }),
)

export default giftsSchema

export const newGiftsSchema = z.object({
  gifts: z.array(
    z.object({
      productName: z
        .string()
        .min(2, { message: 'Enter a valid name for the product' }),
      productLink: z
        .string()
        .min(3, { message: 'Enter a valid link for the gift' }),
      quantity: z.string(),
    }),
  ),
})
