import { PrismaGiftsRepository } from '@/repositories/prisma/prisma-gifts-repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { CreateWeddingService } from '@/services/weddings/create-wedding';
import { createWeddingSchema } from '@/zod-schemas/weddings/create-wedding';
import { type Request, type Response } from 'express';
import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';

export async function createWeddingController(req: Request, res: Response) {
  const { weddingTitle, weddingDate, shippingAddress, gifts } = createWeddingSchema.parse(req.body);

  const authRepository = new PrismaAuthRepository();
  const weddingsRepository = new PrismaWeddingsRepository();
  const giftsRepository = new PrismaGiftsRepository();
  const createWeddingService = new CreateWeddingService(
    authRepository,
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
}
