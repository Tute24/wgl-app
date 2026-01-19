import { createGiftsController } from '@/controllers/gifts/create-gifts';
import { getGiftsController } from '@/controllers/gifts/get-gifts';
import { registerGiftContributionController } from '@/controllers/gifts/register-gift-contribution';
import { createWeddingController } from '@/controllers/weddings/create-wedding';
import { deleteWeddingController } from '@/controllers/weddings/delete-wedding';
import { getWeddingsController } from '@/controllers/weddings/get-weddings';
import authMiddleware from '@/middlewares/auth-middleware';
import { asyncHandler } from '@/utils/async-handler';
import type { Router } from 'express';
import express from 'express';

export const weddingsRouter: Router = express.Router();

weddingsRouter.post('/', authMiddleware, asyncHandler(createWeddingController));
weddingsRouter.post('/:weddingId/gifts', authMiddleware, asyncHandler(createGiftsController));
weddingsRouter.get('/:weddingId/gifts', authMiddleware, asyncHandler(getGiftsController));
weddingsRouter.post(
  '/:weddingId/gifts/:giftId/contributions',
  authMiddleware,
  asyncHandler(registerGiftContributionController),
);
weddingsRouter.get('/', authMiddleware, asyncHandler(getWeddingsController));
weddingsRouter.delete('/', authMiddleware, asyncHandler(deleteWeddingController));
