import express, { Router } from 'express'
import isAuthenticated from '../../middleware/authMiddleware'
import { acceptRequestController } from './requests.controller'

export const requestsRouter: Router = express.Router()
requestsRouter.post(
  '/accept-request',
  isAuthenticated,
  acceptRequestController
)
