import { z } from 'zod'
import { ProfileDataSchema, SkillSchema, CertificateSchema } from '@/schemas/profileData'

declare global {
  type ProfileData = z.infer<typeof ProfileDataSchema>
  type Skill = z.infer<typeof SkillSchema>
  type Certificate = z.infer<typeof CertificateSchema>
}
