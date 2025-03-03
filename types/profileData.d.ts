import { z } from 'zod'
import {
  ProfileDataSchema,
  SkillSchema,
  CertificateSchema,
  AboutMeSchema
} from '@/schemas/profileData'

declare global {
  type ProfileData = z.infer<typeof ProfileDataSchema>
  type Skill = z.infer<typeof SkillSchema>
  type Certificate = z.infer<typeof CertificateSchema>
  type AboutMe = z.infer<typeof AboutMeSchema>
}
