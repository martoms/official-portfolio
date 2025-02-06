import { z } from 'zod'
import { ApiResponse } from '@/utils/ApiResponse'
import { ContentModesSchema, QuotesSchema, JokeSchema } from '@/schemas/landingContents'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)
  const { content } = event.context.params as { content: 'quotes' | 'jokes' }

  if (!ContentModesSchema.safeParse(content).success) {
    return apiResponse.error(null, 'NOT_FOUND', 404)
  }

  const quotesApi = useRuntimeConfig().quotesUri as ContentMode
  const jokesApi = useRuntimeConfig().jokesUri as ContentMode

  let api: ContentMode

  switch (content) {
    case 'quotes':
      api = quotesApi
      break
    case 'jokes':
      api = jokesApi
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
      }
    } catch (e) {
      return apiResponse.error(null, 'API_PARSE_ERROR')
    }
  } catch {
    return apiResponse.error(null, 'NOT_FOUND', 404)
  }
})
