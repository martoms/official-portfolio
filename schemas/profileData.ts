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

export const SkillSchema = z.object({
  name: z.string(),
  img: z.string().url(),
  order: z.number()
})

export const SkillsSchema = z.object({
  section: z.string(),
  backend: z.array(SkillSchema),
  frontend: z.array(SkillSchema),
  graphicDesign: z.array(SkillSchema),
  others: z.array(SkillSchema)
})

export const ProfileDataSchema = z.array(z.union([AboutMeSchema, SkillsSchema]))
