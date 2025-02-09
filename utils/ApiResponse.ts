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
