import { UpdateGiftDataServiceDto } from '@/dtos/gifts/update-gift-data';
import { AuthRepository } from '@/repositories/auth-repository';
import { GiftsRepository } from '@/repositories/gifts-repository';
import { WeddingsRepository } from '@/repositories/weddings-repository';
import { AppError } from '@/utils/app-error';

export class UpdateGiftDataService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
    private giftsRepository: GiftsRepository,
  ) {}

  async execute({
    userId,
    giftId,
    updateData,
  }: UpdateGiftDataServiceDto): Promise<{ message: string }> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const gift = await this.giftsRepository.findGiftById(giftId);
    if (!gift) throw new AppError('Gift not found.', 404);

    const wedding = await this.weddingsRepository.findWeddingById(gift.fromWedding);

    if (wedding && wedding.createdBy !== userId)
      throw new AppError('User does not have permission to perform this action.', 403);

    await this.giftsRepository.updateGiftData({ giftId, updateData });

    return {
      message: 'Gift successfully updated.',
    };
  }
}
