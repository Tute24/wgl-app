import express, { Router } from 'express'
import isAuthenticated from '../../middleware/authMiddleware'
import {
  giftPresentController,
  updateGiftController
} from './gifts.controller'
export const giftsRouter: Router = express.Router()

giftsRouter.post(
  'update-gift',
  isAuthenticated,
  updateGiftController
)

giftsRouter.post(
  'gift-present',
  isAuthenticated,
  giftPresentController
)
