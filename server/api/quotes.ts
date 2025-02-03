import { z } from 'zod'
import { ApiResponse } from '@/utils/ApiResponse'
import { QuotesSchema } from '~/schemas/landingContents'

export default defineEventHandler(async (event) => {
  const quotesApi = useRuntimeConfig().quotesUri
  const apiResponse = new ApiResponse(event)

  try {
    const res = await $fetch(quotesApi)

    try {
      const parsedData = z.array(QuotesSchema).parse(res)
      return apiResponse.sucess(parsedData[0], 'QUOTE_RETRIEVED')
    } catch {
      return apiResponse.error(null, 'API_PARSE_ERROR')
    }
  } catch {
    return apiResponse.error(null, 'QUOTE_NOT_FOUND', 404)
  }
})
