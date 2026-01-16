import { UpdateGiftStruct } from '@/dtos/gifts/update-gift-data';
import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaGiftsRepository } from '@/repositories/prisma/prisma-gifts-repository';
import { PrismaWeddingsRepository } from '@/repositories/prisma/prisma-weddings-repository';
import { UpdateGiftDataService } from '@/services/gifts/update-gift-data';
import { updateGiftDataSchema } from '@/zod-schemas/gifts/update-gift-data';
import { type Request, type Response } from 'express';

export async function updateGiftDataController(req: Request, res: Response) {
  const { giftId, updateData } = updateGiftDataSchema.parse(req.body);
  const authRepository = new PrismaAuthRepository();
  const weddingsRepository = new PrismaWeddingsRepository();
  const giftsRepository = new PrismaGiftsRepository();
  const updateGiftDataService = new UpdateGiftDataService(
    authRepository,
    weddingsRepository,
    giftsRepository,
  );
  const treatedUpdateData: Partial<UpdateGiftStruct> = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value !== undefined),
  );
  const { message } = await updateGiftDataService.execute({
    userId: req.authUser?.id ? req.authUser.id : '',
    giftId,
    updateData: treatedUpdateData,
  });

  res.status(200).json({ message });
}
