import { z } from 'zod'

export const idSchema = z.object({
  id: z.coerce.number().min(1),
})
