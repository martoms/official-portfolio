import { ApiResponse, handleError, InvalidForm } from '@/utils/ApiResponse'
import cloudinary from '@/utils/cloudinary'
import { commonUtils } from '@/utils/common'
import { CloudinaryImageSchema } from '@/schemas/skillsData'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)
  const { toBase64 } = commonUtils()

  try {
    const formData = await readMultipartFormData(event)

    if (!formData) throw new InvalidForm()

    const name = formData.find((f) => f.name === 'name')?.data.toString('utf-8')
    const img = formData.find((f) => f.name === 'img')
    const order = formData.find((f) => f.name === 'order')?.data.toString('utf-8')
    const category = formData.find((f) => f.name === 'category')?.data.toString('utf-8')

    if (!name || !img || !order || !category) throw new InvalidForm()

    const cloudinaryResult = await cloudinary.uploader.upload(toBase64(img), {
      upload_preset: 'ml_default',
      folder: 'portfolio/skills'
    })

    const { url } = CloudinaryImageSchema.parse(cloudinaryResult)

    const skill = await ProfileDataSchema.findOneAndUpdate(
      { section: 'skills' },
      {
        $push: { [category]: { name, img: url, order: Number(order) } }
      }
    )

    if (!skill) throw new Error()

    const newSkill = {
      name,
      img: url,
      order: Number(order)
    }

    return apiResponse.success(newSkill, 'SKILL_ADDED')
  } catch (e) {
    e instanceof Error && console.log(e.message)
    return handleError(e, event)
  }
})
