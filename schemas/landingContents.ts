import { z } from 'zod'

export const QuotesSchema = z.object({
  q: z.string(),
  a: z.string()
})
