import { ApiResponse } from '@/utils/ApiResponse'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)

  try {
    const data = await ProfileDataSchema.find({})
    return apiResponse.success(data, 'PROFILE_DATA_RETRIEVED')
  } catch {
    return apiResponse.error(null, 'NOT_FOUND', 404)
  }
})
