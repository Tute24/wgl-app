import { deleteGiftController } from '@/controllers/gifts/delete-gift';
import { updateGiftDataController } from '@/controllers/gifts/update-gift-data';
import authMiddleware from '@/middlewares/auth-middleware';
import { asyncHandler } from '@/utils/async-handler';
import express, { Router } from 'express';

export const giftsRouter: Router = express.Router();

giftsRouter.delete('/', authMiddleware, asyncHandler(deleteGiftController));
giftsRouter.patch('/', authMiddleware, asyncHandler(updateGiftDataController));
