import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGiftContributionsRepository } from '@/repositories/prisma/prisma-gift-contributions-repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { GetGiftContributionsService } from '@/services/gifts/get-gift-contributions';
import { errorHandler } from '@/utils/error-handler';
import { type Response, type Request } from 'express';
import z from 'zod';

export async function getGiftContributionsController(req: Request, res: Response) {
  try {
    const { weddingId } = z
      .object({
        weddingId: z.number(),
      })
      .parse(req.body);

    const authRepository = new PrismaAuthRepository();
    const weddingsRepository = new PrismaWeddingsRepository();
    const giftContributionsRepository = new PrismaGiftContributionsRepository();
    const getGiftContributionsService = new GetGiftContributionsService(
      authRepository,
      weddingsRepository,
      giftContributionsRepository,
    );

    const { giftContributions, weddingHeader } = await getGiftContributionsService.execute({
      userId: req.authUser?.id ? req.authUser.id : '',
      weddingId,
    });

    res.status(200).json({ giftContributions, weddingHeader });
  } catch (error) {
    errorHandler(error, res);
  }
}
