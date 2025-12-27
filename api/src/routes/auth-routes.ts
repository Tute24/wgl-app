import { createUserController } from '@/controllers/auth/create-user.js';
import { signInController } from '@/controllers/auth/sign-in.js';
import { signOutController } from '@/controllers/auth/sign-out.js';
import authMiddleware from '@/middlewares/auth-middleware.js';
import express, { type Router } from 'express';

export const authRouter: Router = express.Router();

authRouter.post('/sign-in', signInController);
authRouter.post('/create-user', createUserController);
authRouter.post('/sign-out', authMiddleware, signOutController);
