import { z } from 'zod'
import { ProfileDataSchema } from '@/schemas/profileData'

declare global {
  type ProfileData = z.infer<typeof ProfileDataSchema>
}
