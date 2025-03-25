import { ApiResponse, handleError, DeleteError } from '@/utils/ApiResponse'
import cloudinary from '@/utils/cloudinary'
import { SkillsDeleteSchema } from '@/schemas/skillsData'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)

  try {
    const body = await readBody(event)
    const { category, name, img } = SkillsDeleteSchema.parse(body)

    const publicId = img.split('/').slice(7).join('/').split('.')[0]

    const res = await cloudinary.uploader.destroy(publicId)

    if (res.result !== 'ok') throw new DeleteError()

    const { modifiedCount } = await ProfileDataSchema.updateOne(
      { section: 'skills' },
      { $pull: { [category]: { name } } }
    )

    if (!modifiedCount) throw new DeleteError()

    return apiResponse.success(true, 'SKILL_DELETED')
  } catch (e) {
    e instanceof Error && console.log(e.message)
    return handleError(e, event)
  }
})
