import express, { Router } from 'express'
import isAuthenticated from '../../middleware/authMiddleware'
import { updateGiftController } from './gifts.controller'
export const giftsRouter: Router = express.Router()

giftsRouter.post(
  'update-gift',
  isAuthenticated,
  updateGiftController
)
