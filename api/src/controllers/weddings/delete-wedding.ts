import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository.js';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository.js';
import { DeleteWeddingService } from '@/services/weddings/delete-wedding.js';
import { errorHandler } from '@/utils/error-handler.js';
import { type Request, type Response } from 'express';
import z from 'zod';

export async function deleteWeddingController(req: Request, res: Response) {
  try {
    const { weddingId } = z
      .object({
        weddingId: z.number(),
      })
      .parse(req.body);
    const authRepository = new PrismaAuthRepository();
    const weddingsRepository = new PrismaWeddingsRepository();
    const deleteWeddingService = new DeleteWeddingService(authRepository, weddingsRepository);

    const { message } = await deleteWeddingService.execute({
      userId: req.authUser?.id ? req.authUser.id : '',
      weddingId,
    });

    res.status(200).json({ message });
  } catch (error) {
    errorHandler(error, res);
  }
}
