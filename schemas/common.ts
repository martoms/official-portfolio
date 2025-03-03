import { z } from 'zod'

export const NonEmptyTextSchema = z
  .string()
  .min(1, 'Field must not be empty')
  .brand<'NonEmptyText'>()

export const APIResponseSchema = z.object({
  data: z.any(),
  code: z.string().brand<'APIResponseCode'>()
})

export const UsernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters long')
  .brand<'Username'>()
export const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .brand<'Password'>()

export const CredentialSchmema = z.object({
  username: UsernameSchema,
  password: PasswordSchema
})

export const DBPasswordSchema = z
  .object({
    credentials: z.object({ password: PasswordSchema })
  })
  .transform((data) => ({
    password: data.credentials.password
  }))

export const NavigationTitleSchma = z
  .enum(['Home', 'Profile', 'About Me', 'Skills', 'Awards & Certificates'])
  .brand<'NavigationTitle'>()

export const NavigationSchema = z.object({
  name: NavigationTitleSchma,
  link: z.string().brand<'Link'>()
})
