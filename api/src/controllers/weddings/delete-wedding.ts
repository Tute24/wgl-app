import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { DeleteWeddingService } from '@/services/weddings/delete-wedding';
import { type Request, type Response } from 'express';
import z from 'zod';

export async function deleteWeddingController(req: Request, res: Response) {
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
}
