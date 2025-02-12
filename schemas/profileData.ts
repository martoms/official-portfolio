import { z } from 'zod'

export const AboutMeSchema = z.object({
  section: z.string(),
  img: z.string().url().nullish(),
  name: z.string(),
  currentPosition: z.string(),
  currentCompany: z.string(),
  cv: z.string(),
  intro: z.string()
})

export const ProfileDataSchema = z.array(AboutMeSchema)
