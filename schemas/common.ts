import { z } from 'zod'

export const APIResponseSchema = z.object({
  data: z.any(),
  code: z.string()
})

export const NavigationTitleSchma = z.enum([
  'Home',
  'Profile',
  'About Me',
  'Skills',
  'Awards & Certificates'
])

export const NavigationSchema = z.object({
  name: NavigationTitleSchma,
  link: z.string()
})
