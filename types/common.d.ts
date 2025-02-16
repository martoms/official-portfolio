import { z } from 'zod'

import { NavigationTitleSchma, NavigationSchema } from '@/schemas/common'

declare global {
  type NavigationTitle = z.infer<typeof NavigationTitleSchma>
  type Navigation = z.infer<typeof NavigationSchema>
}
