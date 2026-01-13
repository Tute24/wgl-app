import { acceptGuestRequestController } from '@/controllers/guest-requests/accept-guest-request';
import { countPendingGuestRequestsController } from '@/controllers/guest-requests/count-pending-guest-requests';
import { createGuestRequestController } from '@/controllers/guest-requests/create-guest-request';
import { denyGuestRequestController } from '@/controllers/guest-requests/deny-guest-request';
import { getGuestRequestsHistoryController } from '@/controllers/guest-requests/get-guest-requests-history';
import authMiddleware from '@/middlewares/auth-middleware';
import express, { Router } from 'express';

export const guestRequestsRouter: Router = express.Router();

guestRequestsRouter.post('/create', authMiddleware, createGuestRequestController);
guestRequestsRouter.get('/', authMiddleware, getGuestRequestsHistoryController);
guestRequestsRouter.patch('/accept', authMiddleware, acceptGuestRequestController);
guestRequestsRouter.patch('/deny', authMiddleware, denyGuestRequestController);
guestRequestsRouter.get('/pending/count', authMiddleware, countPendingGuestRequestsController);
