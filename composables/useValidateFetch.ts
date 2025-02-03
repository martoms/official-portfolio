import { APIResponseSchema } from '@/schemas/common'

export const useValidateFetch = async (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' = 'GET'
) => {
  try {
    const { data: res, error } = await useFetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { data, code } = APIResponseSchema.parse(res.value)

    return { data, code, error }
  } catch (e) {
    return { data: null, code: 'API_FETCH_ERROR', error: e }
  }
}
