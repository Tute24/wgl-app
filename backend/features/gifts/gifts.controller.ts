import { Response } from 'express'
import { CustomRequest } from '../../middleware/authMiddleware'
import {
  deleteGiftService,
  giftPresentService,
  updateGiftService
} from './gifts.service'
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

export async function giftPresentController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const { id } = req.query
  const { giftID, quantity } = req.body

  try {
    const response = await giftPresentService(
      userID,
      Number(id),
      Number(giftID),
      Number(quantity)
    )
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export async function deleteGiftController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const { giftID } = req.body

  try {
    const response = await deleteGiftService(
      userID,
      Number(giftID)
    )
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
