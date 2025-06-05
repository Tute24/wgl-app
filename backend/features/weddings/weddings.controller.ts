import { Response } from 'express'
import { CustomRequest } from '../../middleware/authMiddleware'
import giftProps from '../../types/giftProps'
import { controllerErrorHandler } from '../../utils/controller-error-handler'
import {
  createWeddingService,
  deleteWeddingService,
  getWeddingsService
} from './weddings.service'

export type weddingResponse = {
  id: number
  weddingTitle: string
  weddingDate: string
  shippingAddress: string
  createdBy: string
  createdAt: Date | null
}

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

export async function getWeddingsController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id

  try {
    const response = await getWeddingsService(userID)
    const message = response.message
    const ownWeddings: weddingResponse[] | [] =
      response.ownWeddings
    const guestWeddings: weddingResponse[] | [] =
      response.guestWeddings
    const userInfo = response.userInfo
    res
      .status(200)
      .json({
        message,
        ownWeddings,
        guestWeddings,
        userInfo
      })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export async function deleteWeddingController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const weddingID = Number(req.body.id)

  try {
    const response = await deleteWeddingService(
      userID,
      weddingID
    )
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
