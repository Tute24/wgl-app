import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { GetWeddingsService } from '@/services/weddings/get-weddings';
import { type Request, type Response } from 'express';
export async function getWeddingsController(req: Request, res: Response) {
  const authRepository = new PrismaAuthRepository();
  const weddingsRepository = new PrismaWeddingsRepository();
  const getWeddingsService = new GetWeddingsService(authRepository, weddingsRepository);

  const { ownWeddings, invitedWeddings } = await getWeddingsService.execute({
    userId: req.authUser?.id ? req.authUser.id : '',
  });

  res.status(200).json({ ownWeddings, invitedWeddings });
}
