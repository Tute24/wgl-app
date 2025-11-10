import express, { Router } from 'express'
import isAuthenticated from '../../middleware/authMiddleware'
import {
  acceptRequestController,
  denyRequestController,
  getPendingRequestsController,
  getRequestsController,
  makeRequestController
} from './requests.controller'

export const requestsRouter: Router = express.Router()

requestsRouter.post(
  '/accept',
  isAuthenticated,
  acceptRequestController
)

requestsRouter.post(
  '/make',
  isAuthenticated,
  makeRequestController
)

requestsRouter.post(
  '/deny',
  isAuthenticated,
  denyRequestController
)

requestsRouter.get(
  '/get',
  isAuthenticated,
  getRequestsController
)

requestsRouter.get(
  '/pending-requests',
  isAuthenticated,
  getPendingRequestsController
)
