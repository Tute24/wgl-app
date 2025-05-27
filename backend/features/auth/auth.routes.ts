import express, { Router } from 'express'
import { signInController } from './auth.controller'
const authRouter: Router = express.Router()

authRouter.post('/sign-in', signInController)
