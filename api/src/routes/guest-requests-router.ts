import { acceptGuestRequestController } from '@/controllers/guest-requests/accept-guest-request';
import { countPendingGuestRequestsController } from '@/controllers/guest-requests/count-pending-guest-requests';
import { createGuestRequestController } from '@/controllers/guest-requests/create-guest-request';
import { denyGuestRequestController } from '@/controllers/guest-requests/deny-guest-request';
import { getGuestRequestsHistoryController } from '@/controllers/guest-requests/get-guest-requests-history';
import authMiddleware from '@/middlewares/auth-middleware';
import { asyncHandler } from '@/utils/async-handler';
import express, { Router } from 'express';

export const guestRequestsRouter: Router = express.Router();

guestRequestsRouter.post('/', authMiddleware, asyncHandler(createGuestRequestController));
guestRequestsRouter.get('/', authMiddleware, asyncHandler(getGuestRequestsHistoryController));
guestRequestsRouter.patch('/accept', authMiddleware, asyncHandler(acceptGuestRequestController));
guestRequestsRouter.patch('/deny', authMiddleware, asyncHandler(denyGuestRequestController));
guestRequestsRouter.get(
  '/pending/count',
  authMiddleware,
  asyncHandler(countPendingGuestRequestsController),
);
