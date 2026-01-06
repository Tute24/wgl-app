import { createGiftsController } from '@/controllers/gifts/create-gifts';
import authMiddleware from '@/middlewares/auth-middleware';
import express, { Router } from 'express';

export const giftsRouter: Router = express.Router();

giftsRouter.post('/create', authMiddleware, createGiftsController);
