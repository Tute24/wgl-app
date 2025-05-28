import express, { Router } from 'express'
import {
  forgotPasswordController,
  resetPasswordController,
  signInController,
  signOutController
} from './auth.controller'
import isAuthenticated from '../../middleware/authMiddleware'
import resetPasswordAuth from '../../middleware/resetPasswordMiddleware'
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

authRouter.post(
  '/reset-password',
  resetPasswordAuth,
  resetPasswordController
)
