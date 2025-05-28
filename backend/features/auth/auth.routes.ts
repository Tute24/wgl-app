import express, { Router } from 'express'
import {
  forgotPasswordController,
  signInController,
  signOutController
} from './auth.controller'
import isAuthenticated from '../../middleware/authMiddleware'
export const authRouter: Router = express.Router()

authRouter.post('/sign-in', signInController)

authRouter.post(
  '/sign-out',
  isAuthenticated,
  signOutController
)

authRouter.post(
  '/forgot-password',
  forgotPasswordController
)
