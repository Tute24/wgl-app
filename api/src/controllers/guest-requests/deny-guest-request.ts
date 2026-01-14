import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGuestRequestsRepository } from '@/repositories/prisma/prisma-guest-requests-repository';
import { DenyGuestRequestService } from '@/services/guest-requests/deny-guest-request';
import { type Request, type Response } from 'express';
import z from 'zod';

export async function denyGuestRequestController(req: Request, res: Response) {
  const { guestRequestId } = z
    .object({
      guestRequestId: z.number(),
    })
    .parse(req.body);

  const authRepository = new PrismaAuthRepository();
  const guestRequestsRepository = new PrismaGuestRequestsRepository();
  const denyGuestRequestService = new DenyGuestRequestService(
    authRepository,
    guestRequestsRepository,
  );

  const { message } = await denyGuestRequestService.execute({
    guestRequestId,
    userId: req.authUser?.id ?? '',
  });

  res.status(200).json({ message });
}
