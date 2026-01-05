import { createWeddingController } from '@/controllers/weddings/create-wedding.js';
import { deleteWeddingController } from '@/controllers/weddings/delete-wedding.js';
import { getWeddingsController } from '@/controllers/weddings/get-weddings.js';
import authMiddleware from '@/middlewares/auth-middleware.js';
import type { Router } from 'express';
import express from 'express';

export const weddingsRouter: Router = express.Router();

weddingsRouter.post('/create', authMiddleware, createWeddingController);
weddingsRouter.get('/', authMiddleware, getWeddingsController);
weddingsRouter.delete('/', authMiddleware, deleteWeddingController);
