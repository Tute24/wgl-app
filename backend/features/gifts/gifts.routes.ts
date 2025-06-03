import express, { Router } from 'express'
import isAuthenticated from '../../middleware/authMiddleware'
import {
  createGiftController,
  deleteGiftController,
  getGiftsController,
  giftPresentController,
  updateGiftController
} from './gifts.controller'
export const giftsRouter: Router = express.Router()

giftsRouter.post(
  'update',
  isAuthenticated,
  updateGiftController
)

giftsRouter.post(
  'present',
  isAuthenticated,
  giftPresentController
)

giftsRouter.post(
  'delete',
  isAuthenticated,
  deleteGiftController
)

giftsRouter.post(
  'create',
  isAuthenticated,
  createGiftController
)

giftsRouter.get('get', isAuthenticated, getGiftsController)
