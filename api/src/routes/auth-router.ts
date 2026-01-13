import { createUserController } from '@/controllers/auth/create-user';
import { forgotPasswordController } from '@/controllers/auth/forgot-password';
import { resetPasswordController } from '@/controllers/auth/reset-password';
import { signInController } from '@/controllers/auth/sign-in';
import { signOutController } from '@/controllers/auth/sign-out';
import authMiddleware from '@/middlewares/auth-middleware';
import express, { type Router } from 'express';

export const authRouter: Router = express.Router();

authRouter.post('/sign-in', signInController);
authRouter.post('/create-user', createUserController);
authRouter.post('/sign-out', authMiddleware, signOutController);
authRouter.post('/password/forgot', forgotPasswordController);
authRouter.post('/password/reset', resetPasswordController);
