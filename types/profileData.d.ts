import { z } from 'zod'
import {
  ProfileDataSchema,
  SkillSchema,
  SkillsSchema,
  CertificateSchema,
  AboutMeSchema
} from '@/schemas/profileData'
import { SkillCategorySchema } from '@/schemas/skillsData'

declare global {
  type ProfileData = z.infer<typeof ProfileDataSchema>
  type Skill = z.infer<typeof SkillSchema>
  type Skills = z.infer<typeof SkillsSchema>
  type Certificate = z.infer<typeof CertificateSchema>
  type AboutMe = z.infer<typeof AboutMeSchema>
  type SkillCategory = z.infer<typeof SkillCategorySchema>
}
