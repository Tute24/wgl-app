import { Response } from 'express'
import { CustomRequest } from '../../middleware/authMiddleware'
import giftProps from '../../types/giftProps'
import { controllerErrorHandler } from '../../utils/controller-error-handler'
import { createWeddingService } from './weddings.service'

export async function createWeddingController(
  req: CustomRequest,
  res: Response
) {
  const { listTitle, weddingDate, shippingAddress } =
    req.body
  const giftsArray: giftProps[] = req.body.gifts
  const userID = req.authUser!.id

  try {
    const response = await createWeddingService(
      userID,
      listTitle as string,
      weddingDate as string,
      shippingAddress as string,
      giftsArray
    )
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
