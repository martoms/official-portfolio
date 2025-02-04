import { z } from 'zod'
import { QuotesSchema } from '@/schemas/landingContents'

export type Quotes = z.infer<typeof QuotesSchema>
