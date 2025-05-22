import { Response } from 'express'
import { AppError } from '../classes/app-error'

export function controllerErrorHandler (error:unknown, res:Response) {
  if (error instanceof AppError) {
    res
      .status(error.status)
      .json({ message: error.message })
  } else {
    res.status(500).json({ message: 'Server Error.' })
  }
}
