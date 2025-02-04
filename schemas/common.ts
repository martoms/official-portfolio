import { z } from 'zod'

export const APIResponseSchema = z.object({
  data: z.any(),
  code: z.string()
})
