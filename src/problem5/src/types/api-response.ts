export type ApiResponse<T = null> = {
  code: number
  message?: string
  data?: T
}
