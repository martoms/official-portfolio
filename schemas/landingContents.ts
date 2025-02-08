import { z } from 'zod'

export const ContentModesSchema = z.enum(['quotes', 'jokes', 'trivia'])

// Quotes
export const QuotesSchema = z.object({
  q: z.string(),
  a: z.string()
})
// Jokes
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

const triviaResponseCodes = [0, 1, 2, 3, 4, 5]
const TriviaResponseCodesSchema = z.number().refine((n) => triviaResponseCodes.includes(n))

const TriviaResultsSchema = z
  .object({
    type: z.enum(['multiple', 'boolean']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    category: z.string(),
    question: z.string(),
    correct_answer: z.string(),
    incorrect_answers: z.array(z.string())
  })
  .transform((data) => ({
    type: data.type,
    difficulty: data.difficulty,
    category: data.category,
    question: data.question,
    correctAnswer: data.correct_answer,
    incorrectAnswers: data.incorrect_answers
  }))

export const TriviaFinalSchema = z.object({
  type: z.enum(['multiple', 'boolean']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  category: z.string(),
  question: z.string(),
  correctAnswer: z.string(),
  incorrectAnswers: z.array(z.string())
})

export const TriviaRequestTokenSchema = z
  .object({
    response_code: TriviaResponseCodesSchema,
    token: z.string()
  })
  .transform((data) => ({
    responseCode: data.response_code,
    token: data.token
  }))

export const TriviaSchema = z
  .object({
    response_code: TriviaResponseCodesSchema,
    results: z.array(TriviaResultsSchema)
  })
  .transform((data) => ({
    responseCode: data.response_code,
    results: data.results
  }))

// Union Schema
export const LandingContentSchema = z.union([QuotesSchema, JokeSchema, TriviaFinalSchema])
