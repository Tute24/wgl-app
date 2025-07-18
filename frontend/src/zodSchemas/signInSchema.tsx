import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default signInSchema
