import { createUserController } from '@/controllers/auth/create-user.js';
import { signInController } from '@/controllers/auth/sign-in.js';
import express, { type Router } from 'express';

export const authRouter: Router = express.Router();

authRouter.post('/sign-in', signInController);
authRouter.post('/create-user', createUserController);
