import { APIResponseSchema } from '@/schemas/common'

export const useValidateFetch = async (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' = 'GET',
  headerOption?: Record<string, string>
) => {
  try {
    const res = await $fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headerOption
      }
    })

    const { data, code } = APIResponseSchema.parse(res)

    return { data, code }
  } catch (e) {
    return { data: null, code: 'API_FETCH_ERROR', error: e }
  }
}
