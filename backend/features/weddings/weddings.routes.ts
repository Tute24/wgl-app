import express, { Router } from 'express'
import isAuthenticated from '../../middleware/authMiddleware'
import {
  createWeddingController,
  getWeddingsController
} from './weddings.controller'
export const weddingsRouter: Router = express.Router()

weddingsRouter.post(
  '/create',
  isAuthenticated,
  createWeddingController
)

weddingsRouter.get(
  '/get',
  isAuthenticated,
  getWeddingsController
)
