import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGiftsRepository } from '@/repositories/prisma/prisma-gifts-repository';
import { PrismaGuestsRepository } from '@/repositories/prisma/prisma-guests.repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { GetGiftsService } from '@/services/gifts/get-gifts';
import { type Request, type Response } from 'express';
import z from 'zod';

export async function getGiftsController(req: Request, res: Response) {
  const { weddingId } = z
    .object({
      weddingId: z.number(),
    })
    .parse(req.body);
  const authRepository = new PrismaAuthRepository();
  const weddingsRepository = new PrismaWeddingsRepository();
  const guestsRepository = new PrismaGuestsRepository();
  const giftsRepository = new PrismaGiftsRepository();
  const getGiftsService = new GetGiftsService(
    authRepository,
    weddingsRepository,
    guestsRepository,
    giftsRepository,
  );

  const { weddingRole, gifts } = await getGiftsService.execute({
    userId: req.authUser?.id ? req.authUser.id : '',
    weddingId,
  });

  res.status(200).json({ weddingRole, gifts });
}
