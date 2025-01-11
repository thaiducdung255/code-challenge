import { Request, Response } from 'express'
import { ApiResponse } from '@interfaces/api-response'

export type Controller<T = unknown> = (
  req: Request,
  res: Response<ApiResponse<T>>,
) => void
