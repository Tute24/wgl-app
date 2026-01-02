import { createWeddingController } from '@/controllers/weddings/create-wedding.js';
import authMiddleware from '@/middlewares/auth-middleware.js';
import type { Router } from 'express';
import express from 'express';

export const weddingsRouter: Router = express.Router();

weddingsRouter.post('/create', authMiddleware, createWeddingController);
