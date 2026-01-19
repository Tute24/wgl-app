import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGiftsRepository } from '@/repositories/prisma/prisma-gifts-repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { CreateGiftsService } from '@/services/gifts/create-gifts';
import { createGiftsSchema } from '@/zod-schemas/gifts/create-gifts';
import { type Request, type Response } from 'express';
import z from 'zod';

export async function createGiftsController(req: Request, res: Response) {
  const { weddingId } = z
    .object({
      weddingId: z.coerce.number(),
    })
    .parse(req.params);
  const gifts = createGiftsSchema.parse(req.body);
  const authRepository = new PrismaAuthRepository();
  const weddingsRepository = new PrismaWeddingsRepository();
  const giftsRepository = new PrismaGiftsRepository();
  const createGiftsService = new CreateGiftsService(
    authRepository,
    weddingsRepository,
    giftsRepository,
  );

  const { giftsList } = await createGiftsService.execute({
    weddingId,
    gifts,
    userId: req.authUser?.id ? req.authUser.id : '',
  });

  res.status(201).json({ giftsList });
}
