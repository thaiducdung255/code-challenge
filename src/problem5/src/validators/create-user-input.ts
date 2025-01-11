import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(100).min(5),
  age: z.number().int().min(0).max(200).optional(),
  phone: z
    .string()
    .regex(/[0-9\s]+[0-9]+/)
    .min(8)
    .max(15)
    .optional(),
})
