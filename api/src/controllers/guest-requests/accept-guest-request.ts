import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGuestRequestsRepository } from '@/repositories/prisma/prisma-guest-requests-repository';
import { PrismaGuestsRepository } from '@/repositories/prisma/prisma-guests.repository';
import { AcceptGuestRequestService } from '@/services/guest-requests/accept-guest-request';
import { type Request, type Response } from 'express';
import z from 'zod';

export async function acceptGuestRequestController(req: Request, res: Response) {
  const { guestRequestId } = z
    .object({
      guestRequestId: z.coerce.number(),
    })
    .parse(req.params);

  const authRepository = new PrismaAuthRepository();
  const guestsRepository = new PrismaGuestsRepository();
  const guestRequestsRepository = new PrismaGuestRequestsRepository();
  const acceptGuestRequestService = new AcceptGuestRequestService(
    authRepository,
    guestsRepository,
    guestRequestsRepository,
  );

  const { message } = await acceptGuestRequestService.execute({
    guestRequestId,
    userId: req.authUser?.id ?? '',
  });

  res.status(200).json({ message });
}
