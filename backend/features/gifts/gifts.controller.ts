import { Response } from 'express'
import { CustomRequest } from '../../middleware/authMiddleware'
import {
  createGiftService,
  deleteGiftService,
  getGiftedProductsService,
  getGiftsService,
  giftPresentService,
  updateGiftService
} from './gifts.service'
import { controllerErrorHandler } from '../../utils/controller-error-handler'
import giftProps from '../../types/giftProps'
import { AppError } from '../../classes/app-error'

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

export async function createGiftController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const weddingID = Number(req.query.id)
  const newGiftsArray: giftProps[] = req.body

  try {
    const response = await createGiftService(
      userID,
      weddingID,
      newGiftsArray
    )
    const message = response.message
    const newGifts = response.newGifts
    res.status(200).json({ message, newGifts })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export async function getGiftsController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const weddingID = Number(req.query.id)

  try {
    const response = await getGiftsService(
      userID,
      weddingID
    )
    const message = response.message
    const responseObject = response.responseObject
    res.status(200).json({ message, responseObject })
  } catch (error) {
    if (error instanceof AppError && error.data) {
      return controllerErrorHandler(error, res, error.data)
    }
    return controllerErrorHandler(error, res)
  }
}

export async function getGiftedProductsController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const weddingID = Number(req.query.id)

  try {
    const response = await getGiftedProductsService(
      userID,
      weddingID
    )
    const message = response.message
    const giftedProducts = response.giftedProducts
    res.status(200).json({ message, giftedProducts })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
