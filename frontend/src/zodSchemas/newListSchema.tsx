import { z } from 'zod';

const newListSchema = z.object({
  listTitle: z.string().min(3, { message: 'Enter a valid name for the wedding' }),
  weddingDate: z.string(),
  shippingAddress: z.string().min(3, { message: 'Enter a valid address' }),
  gifts: z.array(
    z.object({
      productName: z.string().min(2, { message: 'Enter a valid name for the product' }),
      productLink: z.string().min(3, { message: 'Enter a valid link for the gift' }),
      quantity: z.string(),
    }),
  ),
});

export default newListSchema;
