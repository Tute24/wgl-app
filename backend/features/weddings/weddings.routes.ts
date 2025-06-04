import express, { Router } from 'express'
import isAuthenticated from '../../middleware/authMiddleware'
import { createWeddingController } from './weddings.controller'
export const weddingsRouter: Router = express.Router()

weddingsRouter.post(
  '/create',
  isAuthenticated,
  createWeddingController
)
