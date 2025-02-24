import { handleError, ApiResponse, NotFound } from '@/utils/ApiResponse'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)

  try {
    const data = await ProfileDataSchema.find({})
    if (!data) throw new NotFound()
    return apiResponse.success(data, 'PROFILE_DATA_RETRIEVED')
  } catch (e) {
    return handleError(e, event)
  }
})
