import { z } from 'zod'
import { NonEmptyTextSchema } from '@/schemas/common'

export const AboutMeSchema = z.object({
  section: z.literal('aboutMe'),
  img: z.string().url().nullish(),
  name: z.string(),
  currentPosition: z.string(),
  start: z.number(),
  currentCompany: z.string(),
  cv: z.string().url(),
  intro: z.string()
})

export const SkillSchema = z.object({
  name: z.string(),
  img: z.string().url(),
  order: z.number()
})

export const SkillsSchema = z.object({
  section: z.literal('skills'),
  backend: z.array(SkillSchema),
  frontend: z.array(SkillSchema),
  graphicDesign: z.array(SkillSchema),
  others: z.array(SkillSchema)
})

export const CertificateSchema = z.object({
  title: z.string(),
  description: z.string(),
  img: z.string(),
  url: z.string(),
  order: z.number()
})

export const AwardsSchema = z.object({
  section: z.literal('awards'),
  certificates: z.array(CertificateSchema)
})

export const CurrentPositionSchemaUpdateForm = z.object({
  currentPosition: NonEmptyTextSchema.nullish(),
  currentCompany: NonEmptyTextSchema.nullish(),
  start: z.number().nullish()
})

export const IntroPositionSchemaUpdateForm = z.object({
  intro: NonEmptyTextSchema.nullish()
})

export const CVSchemaUpdateForm = z.object({
  cv: z.string().url().nullish()
})

export const ProfileDataSchema = z.array(z.union([AboutMeSchema, SkillsSchema, AwardsSchema]))
