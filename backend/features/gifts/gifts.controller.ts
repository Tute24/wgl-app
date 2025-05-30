import { Response } from 'express'
import { CustomRequest } from '../../middleware/authMiddleware'
import { updateGiftService } from './gifts.service'
import { controllerErrorHandler } from '../../utils/controller-error-handler'

export async function updateGiftController(
  req: CustomRequest,
  res: Response
) {
  const { id } = req.authUser!
  const { giftID, productLink, productName, quantity } =
    req.body

  try {
    const response = await updateGiftService(
      id,
      productName as string,
      productLink as string,
      Number(quantity),
      Number(giftID)
    )
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
