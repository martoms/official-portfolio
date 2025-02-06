import { z } from 'zod'

export const ContentModesSchema = z.enum(['quotes', 'jokes', 'trivia'])

export const QuotesSchema = z.object({
  q: z.string(),
  a: z.string()
})

const JokeSchemaBasic = z.object({
  error: z.boolean(),
  type: z.enum(['single', 'twopart'])
})

export const SingleJokeSchema = JokeSchemaBasic.extend({
  joke: z.string()
})

export const TwopartJokeSchema = JokeSchemaBasic.extend({
  setup: z.string(),
  delivery: z.string()
})

export const JokeSchema = z.union([SingleJokeSchema, TwopartJokeSchema])

export const LandingContentSchema = z.union([QuotesSchema, JokeSchema])
