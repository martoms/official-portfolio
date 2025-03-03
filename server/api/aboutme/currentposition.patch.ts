import { ApiResponse, handleError } from '@/utils/ApiResponse'
import { CurrentPositionSchemaUpdateForm } from '@/schemas/profileData'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)

  try {
    const body = await readBody(event)
    const payload = CurrentPositionSchemaUpdateForm.parse(body)

    const { modifiedCount } = await ProfileDataSchema.updateOne({ section: 'aboutMe' }, payload)

    if (!modifiedCount) throw new Error()
    return apiResponse.success(true, 'CURRENT_POSITION_UPDATED')
  } catch (e) {
    return handleError(e, event)
  }
})
