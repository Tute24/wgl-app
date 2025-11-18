import { Response, Request } from 'express'
import {
  forgotPasswordService,
  resetPasswordService,
  signInService
} from './auth.service'
import { controllerErrorHandler } from '../../utils/controller-error-handler'
import { ResetPasswordRequest } from '../../middleware/resetPasswordMiddleware'
import { CustomRequest } from '../../middleware/authMiddleware'
import { AppError } from '../../classes/app-error'

export async function signInController(
  req: Request,
  res: Response
) {
  const { email, password } = req.body

  try {
    const response = await signInService(email, password)
    const token = response.token
    const username = response.username
    res.status(200).json({ username, token })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export function signOutController(
  req: CustomRequest,
  res: Response
) {
  try {
    if (!req.authUser) {
      throw new AppError('Not authenticated', 401)
    }
    res
      .status(200)
      .json({ message: 'User signed out successfully.' })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export async function forgotPasswordController(
  req: Request,
  res: Response
) {
  const { email } = req.body
  try {
    const response = await forgotPasswordService(email)
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export async function resetPasswordController(
  req: ResetPasswordRequest,
  res: Response
) {
  const { id, resetToken } = req.authData!
  const { password } = req.body

  try {
    if (!id || !resetToken) {
      throw new AppError(
        'Missing reset password credentials',
        400
      )
    }
    const response = await resetPasswordService(
      id,
      resetToken,
      password
    )
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
