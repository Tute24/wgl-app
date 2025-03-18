import { z } from "zod";
import giftsSchema from "./giftsSchema";

const newListSchema = z.object({
    listTitle: z.string(),
    weddingDate: z.string(),
    shippingAddress: z.string(),
    gifts: z.array(z.object({
        productName: z.string(),
        productLink: z.string(),
        quantity: z.string()
    }))
})

export default newListSchema