import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository.js';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository.js';
import { GetWeddingsService } from '@/services/weddings/get-weddings.js';
import { errorHandler } from '@/utils/error-handler.js';
import { type Request, type Response } from 'express';
export async function getWeddingsController(req: Request, res: Response) {
  try {
    const authRepository = new PrismaAuthRepository();
    const weddingsRepository = new PrismaWeddingsRepository();
    const getWeddingsService = new GetWeddingsService(authRepository, weddingsRepository);

    const { ownWeddings, invitedWeddings } = await getWeddingsService.execute({
      userId: req.authUser?.id ? req.authUser.id : '',
    });

    res.status(200).json({ ownWeddings, invitedWeddings });
  } catch (error) {
    errorHandler(error, res);
  }
}
