import { z } from 'zod'

export const SkillCategorySchema = z.enum(['backend', 'frontend', 'graphicDesign', 'others'])

export const CloudinaryImageSchema = z
  .object({
    secure_url: z.string().url()
  })
  .transform((data) => ({ url: data.secure_url }))
