import { ApiResponse } from '@/utils/ApiResponse'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)

  setCookie(event, 'isAdmin', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0
  })
  return apiResponse.success(null, 'LOGGED_OUT')
})
