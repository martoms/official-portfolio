import { APIResponseSchema } from '@/schemas/common'

export const useValidateFetch = async (
  url: string,
  body?: any,
  options?: {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT'
    headerOption?: Record<string, string>
  }
) => {
  const { method, headerOption } = options || {}
  try {
    const res = await $fetch(url, {
      method: method || 'GET',
      body,
      headers: {
        ...headerOption
      }
    })

    const { data, code } = APIResponseSchema.parse(res)

    return { data, code, error: null }
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes('404 Not Found')) return { data: null, code: 'NOT_FOUND', error: e }
      else if (e.message.includes('401 Unauthorized'))
        return { data: null, code: 'UNAUTHORIZED', error: e }
      else if (e.message.includes('400 Bad Request'))
        return { data: null, code: 'INCORRECT_PAYLOAD', error: e }
    }
    return { data: null, code: 'API_FETCH_ERROR', error: e }
  }
}
