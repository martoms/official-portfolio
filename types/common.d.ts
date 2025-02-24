import { z } from 'zod'

import {
  NavigationTitleSchma,
  NavigationSchema,
  UsernameSchema,
  PasswordSchema
} from '@/schemas/common'

declare global {
  type NavigationTitle = z.infer<typeof NavigationTitleSchma>
  type Navigation = z.infer<typeof NavigationSchema>
  type Username = z.infer<typeof UsernameSchema>
  type Password = z.infer<typeof PasswordSchema>
}
