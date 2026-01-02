import { PrismaGiftsRepository } from '@/repositories/prisma/prisma-gifts-repository.js';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository.js';
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js';
import { CreateWeddingService } from '@/services/weddings/create-wedding.js';
import { errorHandler } from '@/utils/error-handler.js';
import { createWeddingSchema } from '@/zod-schemas/weddings/create-wedding.js';
import { type Request, type Response } from 'express';

export async function createWeddingController(req: Request, res: Response) {
  try {
    const { weddingTitle, weddingDate, shippingAddress, gifts } = createWeddingSchema.parse(
      req.body,
    );

    const usersRepository = new PrismaUsersRepository();
    const weddingsRepository = new PrismaWeddingsRepository();
    const giftsRepository = new PrismaGiftsRepository();
    const createWeddingService = new CreateWeddingService(
      usersRepository,
      weddingsRepository,
      giftsRepository,
    );

    const { wedding } = await createWeddingService.execute({
      weddingTitle,
      weddingDate,
      shippingAddress: shippingAddress ? shippingAddress : '',
      gifts,
      userId: req.authUser?.id ? req.authUser?.id : '',
    });

    res.status(201).json({ wedding });
  } catch (error) {
    errorHandler(error, res);
  }
}
