import { z } from "zod";
import giftsSchema from "./giftsSchema";

const newListSchema = z.object({
    listTile: z.string(),
    weddingDate: z.string(),
    shippingAddress: z.string(),
    gifts: giftsSchema
})

export default newListSchema