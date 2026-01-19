import { GetGiftContributionsDto } from '@/dtos/gifts/get-gift-contributions';
import { AuthRepository } from '@/repositories/auth-repository';
import { GiftContributionsRepository } from '@/repositories/gift-contributions-repository';
import { WeddingsRepository } from '@/repositories/weddings-repository';
import {
  GetGiftContributionsResponse,
  TreatedGiftContribution,
} from '@/types/gifts/get-gift-contributions-response';
import { AppError } from '@/utils/app-error';

export class GetGiftContributionsService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
    private giftContributionsRepository: GiftContributionsRepository,
  ) {}

  async execute({
    userId,
    weddingId,
  }: GetGiftContributionsDto): Promise<GetGiftContributionsResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const wedding = await this.weddingsRepository.findWeddingById(weddingId);
    if (!wedding) throw new AppError('Wedding not found.', 404);

    if (wedding.createdBy !== user.id)
      throw new AppError('User does not have permission to perform this action.', 403);

    const weddingGiftContributions =
      await this.giftContributionsRepository.findGiftContributionsByWeddingId(weddingId);

    let giftContributions: TreatedGiftContribution[];

    weddingGiftContributions.length > 0
      ? (giftContributions = weddingGiftContributions.map((record) => ({
          id: record.id,
          presenterName: `${record.user.firstName} ${record.user.lastName}`,
          giftName: record.gift.productName,
          giftedQuantity: record.quantity,
          giftId: record.giftId,
          giftedAt: record.giftedAt,
        })))
      : (giftContributions = []);

    const weddingHeader = {
      weddingId,
      weddingTitle: wedding.weddingTitle,
      weddingDate: wedding.weddingDate,
    };

    return {
      giftContributions,
      weddingHeader,
    };
  }
}
