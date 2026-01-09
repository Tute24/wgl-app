import { createGuestRequestController } from '@/controllers/guest-requests/create-guest-request';
import authMiddleware from '@/middlewares/auth-middleware';
import express, { Router } from 'express';

export const guestRequestsRouter: Router = express.Router();

guestRequestsRouter.post('/create', authMiddleware, createGuestRequestController);
