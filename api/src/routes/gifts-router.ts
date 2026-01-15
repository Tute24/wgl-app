import { createGiftsController } from '@/controllers/gifts/create-gifts';
import { deleteGiftController } from '@/controllers/gifts/delete-gift';
import { getGiftContributionsController } from '@/controllers/gifts/get-gift-contributions';
import { getGiftsController } from '@/controllers/gifts/get-gifts';
import { registerGiftContributionController } from '@/controllers/gifts/register-gift-contribution';
import { updateGiftDataController } from '@/controllers/gifts/update-gift-data';
import authMiddleware from '@/middlewares/auth-middleware';
import { asyncHandler } from '@/utils/async-handler';
import express, { Router } from 'express';

export const giftsRouter: Router = express.Router();

giftsRouter.post('/', authMiddleware, asyncHandler(createGiftsController));
giftsRouter.get('/', authMiddleware, asyncHandler(getGiftsController));
giftsRouter.delete('/', authMiddleware, asyncHandler(deleteGiftController));
giftsRouter.post(
  '/contributions',
  authMiddleware,
  asyncHandler(registerGiftContributionController),
);
giftsRouter.get('/contributions', authMiddleware, asyncHandler(getGiftContributionsController));
giftsRouter.patch('/', authMiddleware, asyncHandler(updateGiftDataController));
