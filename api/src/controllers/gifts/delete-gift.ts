import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGiftsRepository } from '@/repositories/prisma/prisma-gifts-repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { DeleteGiftService } from '@/services/gifts/delete-gift';

import { type Request, type Response } from 'express';
import z from 'zod';

export async function deleteGiftController(req: Request, res: Response) {
  const { giftId } = z
    .object({
      giftId: z.number(),
    })
    .parse(req.body);
  const authRepository = new PrismaAuthRepository();
  const weddingsRepository = new PrismaWeddingsRepository();
  const giftsRepository = new PrismaGiftsRepository();
  const deleteGiftService = new DeleteGiftService(
    authRepository,
    weddingsRepository,
    giftsRepository,
  );

  const { message } = await deleteGiftService.execute({
    userId: req.authUser?.id ? req.authUser.id : '',
    giftId,
  });

  res.status(200).json({ message });
}
