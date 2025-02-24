import { CredentialSchmema, DBPasswordSchema } from '@/schemas/common'
import { handleError, ApiResponse } from '@/utils/ApiResponse'
import { compare } from 'bcrypt-ts'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const apiResponse = new ApiResponse(event)
  try {
    const body = await readBody(event)

    const { username, password } = CredentialSchmema.parse(body)

    const db = await GeneralSchema.findOne(
      { 'credentials.username': username },
      { 'credentials.password': 1, _id: 0 }
    )
    const dbPassword = DBPasswordSchema.safeParse(db).data?.password

    if (dbPassword) {
      const isValid = await compare(password, dbPassword)
      if (isValid) {
        setCookie(event, 'isAdmin', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30
        })
        return apiResponse.success(null, 'AUTHORIZED', 200)
      } else return apiResponse.error(null, 'UNAUTHORIZED', 401)
    } else {
      return apiResponse.error(null, 'UNAUTHORIZED', 401)
    }
  } catch (e) {
    return handleError(e, event)
  }
})
