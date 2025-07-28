import { Response } from 'express'
import { CustomRequest } from '../../middleware/authMiddleware'
import {
  acceptRequestService,
  denyRequestService,
  getRequestsService,
  makeRequestService
} from './requests.service'
import { controllerErrorHandler } from '../../utils/controller-error-handler'

export async function acceptRequestController(
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

export async function makeRequestController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const { weddingID } = req.body
  const weddingIDInt = Number(weddingID)

  try {
    const response = await makeRequestService(
      userID,
      weddingIDInt
    )
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export async function denyRequestController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id
  const { reqID } = req.body

  try {
    const response = await denyRequestService(userID, reqID)
    const message = response.message
    res.status(200).json({ message })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}

export async function getRequestsController(
  req: CustomRequest,
  res: Response
) {
  const userID = req.authUser!.id

  try {
    const response = await getRequestsService(userID)
    const message = response.message
    const requests = response.requests
    res.status(200).json({ message, requests })
  } catch (error) {
    controllerErrorHandler(error, res)
  }
}
