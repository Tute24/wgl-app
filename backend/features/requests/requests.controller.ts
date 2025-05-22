import { Response } from 'express'
import { CustomRequest } from '../../middleware/authMiddleware'
import { acceptRequestService } from './requests.service'
import { controllerErrorHandler } from '../../utils/controller-error-handler'

export async function acceptRequestController (
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const { reqID } = req.body
  const reqIDInt = Number(reqID)

  try {
    const response = await acceptRequestService(
      userID,
      reqIDInt
    )
    const message = response?.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
