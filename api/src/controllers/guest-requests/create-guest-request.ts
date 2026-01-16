import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGuestRequestsRepository } from '@/repositories/prisma/prisma-guest-requests-repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { CreateGuestRequestService } from '@/services/guest-requests/create-guest-request';
import { type Request, type Response } from 'express';
import z from 'zod';

export async function createGuestRequestController(req: Request, res: Response) {
  const { weddingId } = z
    .object({
      weddingId: z.number(),
    })
    .parse(req.body);
  const authRepository = new PrismaAuthRepository();
  const weddingsRepository = new PrismaWeddingsRepository();
  const guestRequestsRepository = new PrismaGuestRequestsRepository();
  const createGuestRequestService = new CreateGuestRequestService(
    authRepository,
    weddingsRepository,
    guestRequestsRepository,
  );

  const { message } = await createGuestRequestService.execute({
    weddingId,
    userId: req.authUser?.id ?? '',
  });

  res.status(201).json({ message });
}
