import { z } from "zod";

const giftsSchema = z.array(z.object({
    productName: z.string(),
    productLink: z.string(),
    quantity: z.number().int().positive()
}))

export default giftsSchema