import express, { Router } from 'express'
import { userCreateController } from './users.controller'

export const usersRouter: Router = express.Router()

usersRouter.post('/user-create', userCreateController)
