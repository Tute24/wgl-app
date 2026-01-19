import { deleteGiftController } from '@/controllers/gifts/delete-gift';
import { getGiftContributionsController } from '@/controllers/gifts/get-gift-contributions';
import { updateGiftDataController } from '@/controllers/gifts/update-gift-data';
import authMiddleware from '@/middlewares/auth-middleware';
import { asyncHandler } from '@/utils/async-handler';
import express, { Router } from 'express';

export const giftsRouter: Router = express.Router();

giftsRouter.delete('/', authMiddleware, asyncHandler(deleteGiftController));
giftsRouter.get('/contributions', authMiddleware, asyncHandler(getGiftContributionsController));
giftsRouter.patch('/', authMiddleware, asyncHandler(updateGiftDataController));
