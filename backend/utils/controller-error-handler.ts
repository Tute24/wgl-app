import { Response } from 'express'
import { AppError } from '../classes/app-error'

export type errorResponseDataType = {
  [key: string]: string | boolean | number
}

export function controllerErrorHandler(
  error: unknown,
  res: Response,
  errorResponseObject?: errorResponseDataType
) {
  if (error instanceof AppError && errorResponseObject) {
    res
      .status(error.status)
      .json({ message: error.message, errorResponseObject })
  }
  if (error instanceof AppError) {
    res
      .status(error.status)
      .json({ message: error.message })
  } else {
    res.status(500).json({ message: 'Server Error.' })
  }
}
