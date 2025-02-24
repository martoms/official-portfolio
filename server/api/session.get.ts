import { ApiResponse } from '@/utils/ApiResponse'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)

  const isAdmin = getCookie(event, 'isAdmin')

  if (!isAdmin) return apiResponse.success(null, 'IS_USER', 200)
  else return apiResponse.success(null, 'IS_ADMIN', 200)
})
