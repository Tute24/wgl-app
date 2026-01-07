import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGiftContributionsRepository } from '@/repositories/prisma/prisma-gift-contributions-repository';
import { PrismaGiftsRepository } from '@/repositories/prisma/prisma-gifts-repository';
import { PrismaGuestsRepository } from '@/repositories/prisma/prisma-guests.repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { RegisterGiftContributionService } from '@/services/gifts/register-gift-contribution';
import { errorHandler } from '@/utils/error-handler';
import { registerGiftContributionSchema } from '@/zod-schemas/gifts/register-gift-contribution';
import { type Request, type Response } from 'express';

export async function registerGiftContributionController(req: Request, res: Response) {
  try {
    const { giftId, quantity, weddingId } = registerGiftContributionSchema.parse(req.body);
    const authRepository = new PrismaAuthRepository();
    const weddingsRepository = new PrismaWeddingsRepository();
    const giftsRepository = new PrismaGiftsRepository();
    const guestsRepository = new PrismaGuestsRepository();
    const giftContributionsRepository = new PrismaGiftContributionsRepository();
    const registerGiftContributionService = new RegisterGiftContributionService(
      authRepository,
      weddingsRepository,
      giftsRepository,
      guestsRepository,
      giftContributionsRepository,
    );

    const { message } = await registerGiftContributionService.execute({
      giftedQuantity: quantity,
      giftId,
      weddingId,
      userId: req.authUser?.id ? req.authUser.id : '',
    });

    res.status(201).json({ message });
  } catch (error) {
    errorHandler(error, res);
  }
}
