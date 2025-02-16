import { z } from 'zod'
import {
  ContentModesSchema,
  QuotesSchema,
  JokeSchema,
  SingleJokeSchema,
  TwopartJokeSchema,
  LandingContentSchema,
  TriviaFinalSchema
} from '@/schemas/landingContents'

declare global {
  type Quotes = z.infer<typeof QuotesSchema>
  type ContentMode = z.infer<typeof ContentModesSchema>
  type SingleJoke = z.infer<typeof SingleJokeSchema>
  type TwopartJoke = z.infer<typeof TwopartJokeSchema>
  type Joke = z.infer<typeof JokeSchema>
  type LandingContent = z.infer<typeof LandingContentSchema>
  type Trivia = z.infer<typeof TriviaFinalSchema>
}
