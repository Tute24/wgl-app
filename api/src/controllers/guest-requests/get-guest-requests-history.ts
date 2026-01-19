import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGuestRequestsRepository } from '@/repositories/prisma/prisma-guest-requests-repository';
import { GetGuestRequestsHistoryService } from '@/services/guest-requests/get-guest-requests-history';
import { type Request, type Response } from 'express';

export async function getGuestRequestsHistoryController(req: Request, res: Response) {
  const authRepository = new PrismaAuthRepository();
  const guestRequestsRepository = new PrismaGuestRequestsRepository();
  const getGuestRequestsHistoryService = new GetGuestRequestsHistoryService(
    authRepository,
    guestRequestsRepository,
  );

  const { requests } = await getGuestRequestsHistoryService.execute({
    userId: req.authUser?.id ?? '',
  });

  res.status(200).json({ requests });
}
