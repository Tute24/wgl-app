import { GetGiftsDto } from '@/dtos/gifts/get-gifts';
import { WeddingAccessPolicies } from '@/policies/weddings/wedding-access-policy';
import { AuthRepository } from '@/repositories/auth-repository';
import { GiftsRepository } from '@/repositories/gifts-repository';
import { GuestsRepository } from '@/repositories/guests-repository';
import { WeddingsRepository } from '@/repositories/weddings-repository';
import { GetGiftsResponse } from '@/types/gifts/get-gifts-response';
import { AppError } from '@/utils/app-error';

export class GetGiftsService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
    private guestsRepository: GuestsRepository,
    private giftsRepository: GiftsRepository,
  ) {}

  async execute({ userId, weddingId }: GetGiftsDto): Promise<GetGiftsResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const wedding = await this.weddingsRepository.findWeddingById(weddingId);
    if (!wedding) throw new AppError('Wedding not found.', 404);

    const guestRecords = await this.guestsRepository.findWeddingsByGuestId(userId);
    const guestWeddingIds = guestRecords.map((record) => record.referencedWedding);
    const weddingRole = WeddingAccessPolicies.getUserRoleOnWedding({
      userId,
      wedding,
      guestWeddingIds,
    });

    const gifts = WeddingAccessPolicies.isAccessToGiftsAllowed(weddingRole)
      ? await this.giftsRepository.getGiftsFromWedding(weddingId)
      : [];

    return {
      weddingRole,
      gifts,
    };
  }
}
