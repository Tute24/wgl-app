import { createGiftsController } from '@/controllers/gifts/create-gifts';
import { deleteGiftController } from '@/controllers/gifts/delete-gift';
import { getGiftsController } from '@/controllers/gifts/get-gifts';
import { registerGiftContributionController } from '@/controllers/gifts/register-gift-contribution';
import authMiddleware from '@/middlewares/auth-middleware';
import express, { Router } from 'express';

export const giftsRouter: Router = express.Router();

giftsRouter.post('/create', authMiddleware, createGiftsController);
giftsRouter.get('/', authMiddleware, getGiftsController);
giftsRouter.delete('/', authMiddleware, deleteGiftController);
giftsRouter.post('/contribute', authMiddleware, registerGiftContributionController);
