import { Response, Request } from 'express'
import { signInService } from './auth.service'
import { controllerErrorHandler } from '../../utils/controller-error-handler'

export async function signInController(
  req: Request,
  res: Response
) {
  const { email, password } = req.body

  try {
    const response = await signInService(email, password)
    const token = response.token
    const message = response.message
    res.status(200).json({ message, token })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export function signOutController(res: Response) {
  try {
    res
      .status(200)
      .json({ message: 'User signed out successfully.' })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
