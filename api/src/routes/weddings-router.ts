import { createWeddingController } from '@/controllers/weddings/create-wedding';
import { deleteWeddingController } from '@/controllers/weddings/delete-wedding';
import { getWeddingsController } from '@/controllers/weddings/get-weddings';
import authMiddleware from '@/middlewares/auth-middleware';
import type { Router } from 'express';
import express from 'express';

export const weddingsRouter: Router = express.Router();

weddingsRouter.post('/create', authMiddleware, createWeddingController);
weddingsRouter.get('/', authMiddleware, getWeddingsController);
weddingsRouter.delete('/', authMiddleware, deleteWeddingController);
