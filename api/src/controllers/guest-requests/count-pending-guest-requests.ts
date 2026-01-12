import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGuestRequestsRepository } from '@/repositories/prisma/prisma-guest-requests-repository';
import { CountPendingGuestRequestsService } from '@/services/guest-requests/count-pending-guest-requests';
import { errorHandler } from '@/utils/error-handler';
import { type Request, type Response } from 'express';

export async function countPendingGuestRequestsController(req: Request, res: Response) {
  try {
    const authRepository = new PrismaAuthRepository();
    const guestRequestsRepository = new PrismaGuestRequestsRepository();
    const countPendingGuestRequestsService = new CountPendingGuestRequestsService(
      authRepository,
      guestRequestsRepository,
    );

    const { pendingGuestRequests } = await countPendingGuestRequestsService.execute({
      userId: req.authUser?.id ?? '',
    });

    res.status(200).json({ pendingGuestRequests });
  } catch (error) {
    errorHandler(error, res);
  }
}
