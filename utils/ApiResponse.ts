import { ZodError } from 'zod'
import type { EventHandlerRequest, H3Event } from 'h3'

export class ApiResponse {
  constructor(private event: any) {}

  success(data: any, code: string, statusCode: number = 200) {
    setResponseStatus(this.event, statusCode)
    return { data, code }
  }

  error(data: any, code: string, statusCode: number = 500) {
    setResponseStatus(this.event, statusCode)
    return { data, code }
  }
}

export class NotFound extends Error {}
export class InvalidForm extends Error {}
export class FileMissing extends Error {}

export const handleError = (error: unknown, event: H3Event<EventHandlerRequest>) => {
  const apiResponse = new ApiResponse(event)

  if (error instanceof ZodError) return apiResponse.error(null, 'BAD_REQUEST', 400)
  else if (error instanceof NotFound) return apiResponse.error(null, 'NOT_FOUND', 404)
  else if (error instanceof InvalidForm) return apiResponse.error(null, 'INVALID_FORM', 422)
  else if (error instanceof FileMissing) return apiResponse.error(null, 'FILE_MISSING', 422)
  else return apiResponse.error(null, 'SERVER_ERROR', 500)
}
