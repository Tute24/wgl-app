import { acceptGuestRequestController } from '@/controllers/guest-requests/accept-guest-request';
import { createGuestRequestController } from '@/controllers/guest-requests/create-guest-request';
import { getGuestRequestsHistoryController } from '@/controllers/guest-requests/get-guest-requests-history';
import authMiddleware from '@/middlewares/auth-middleware';
import express, { Router } from 'express';

export const guestRequestsRouter: Router = express.Router();

guestRequestsRouter.post('/create', authMiddleware, createGuestRequestController);
guestRequestsRouter.get('/', authMiddleware, getGuestRequestsHistoryController);
guestRequestsRouter.patch('/accept', authMiddleware, acceptGuestRequestController);
