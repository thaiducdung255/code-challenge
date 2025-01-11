import { StatusCode } from '@constants/http-status-code'
import { ApiResponse } from '@interfaces/api-response'
import { createLogger } from '@utils/logger'
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'

const logger = createLogger('ErrorHandler')

export function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction,
): void {
  const code = StatusCode.SERVER_ERROR
  res.status(code)
  const method = req.method
  const path = req.originalUrl
  logger.error(`[${code}] ${method} ${path}`)

  res.json({
    code,
    message: err.toString(),
  })
}
