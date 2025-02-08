import { z } from 'zod'
import { ApiResponse } from '@/utils/ApiResponse'
import {
  ContentModesSchema,
  QuotesSchema,
  JokeSchema,
  TriviaSchema
} from '@/schemas/landingContents'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)
  const { content } = event.context.params as { content: 'quotes' | 'jokes' | 'trivia' }

  if (!ContentModesSchema.safeParse(content).success) {
    return apiResponse.error(null, 'NOT_FOUND', 404)
  }

  const quotesApi = useRuntimeConfig().quotesUri
  const jokesApi = useRuntimeConfig().jokesUri
  const triviaApi = useRuntimeConfig().triviaUri
  const triviaUriRequestToken = event.headers.get('triviatoken')

  let api: string

  switch (content) {
    case 'quotes':
      api = quotesApi
      break
    case 'jokes':
      api = jokesApi
      break
    case 'trivia':
      typeof triviaUriRequestToken === 'string'
        ? (api = triviaApi + '&token=' + triviaUriRequestToken)
        : (api = triviaApi)
      break
  }

  try {
    const res = await $fetch(api)

    try {
      switch (content) {
        case 'quotes': {
          const parsedData = z.array(QuotesSchema).parse(res)
          return apiResponse.sucess(parsedData[0], 'QUOTE_RETRIEVED')
        }
        case 'jokes': {
          const parsedData = JokeSchema.parse(res)
          return apiResponse.sucess(parsedData, 'JOKE_RETRIEVED')
        }
        case 'trivia': {
          const parsedData = TriviaSchema.parse(res)
          return apiResponse.sucess(parsedData.results[0], 'TRIVIA_RETRIEVED')
        }
      }
    } catch {
      return apiResponse.error(null, 'API_PARSE_ERROR')
    }
  } catch {
    return apiResponse.error(null, 'NOT_FOUND', 404)
  }
})
