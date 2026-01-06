import { DeleteGiftDto } from '@/dtos/gifts/delete-gift';
import { AuthRepository } from '@/repositories/auth-repository';
import { GiftsRepository } from '@/repositories/gifts-repository';
import { WeddingsRepository } from '@/repositories/weddings-repository';
import { AppError } from '@/utils/app-error';

export class DeleteGiftService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepositoy: WeddingsRepository,
    private giftsRepository: GiftsRepository,
  ) {}

  async execute({ userId, giftId }: DeleteGiftDto): Promise<{ message: string }> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const gift = await this.giftsRepository.findGiftById(giftId);
    if (!gift) throw new AppError('Gift not found.', 404);

    const wedding = await this.weddingsRepositoy.findWeddingById(gift.fromWedding);

    if (wedding && wedding.createdBy !== userId)
      throw new AppError('User does not have permission to perform this action.', 403);

    await this.giftsRepository.deleteGift(giftId);

    return {
      message: 'Gift deleted successfully.',
    };
  }
}
