import { RegisterGiftContributionServiceDto } from '@/dtos/gifts/register-gift-contribution';
import { WeddingAccessPolicies } from '@/policies/weddings/wedding-access-policy';
import { AuthRepository } from '@/repositories/auth-repository';
import { GiftContributionsRepository } from '@/repositories/gift-contributions-repository';
import { GiftsRepository } from '@/repositories/gifts-repository';
import { GuestsRepository } from '@/repositories/guests-repository';
import { WeddingsRepository } from '@/repositories/weddings-repository';
import { AppError } from '@/utils/app-error';

export class RegisterGiftContributionService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
    private giftsRepository: GiftsRepository,
    private guestsRepository: GuestsRepository,
    private giftContributionsRepository: GiftContributionsRepository,
  ) {}

  async execute({
    userId,
    weddingId,
    giftedQuantity,
    giftId,
  }: RegisterGiftContributionServiceDto): Promise<{ message: string }> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const wedding = await this.weddingsRepository.findWeddingById(weddingId);
    if (!wedding) throw new AppError('Wedding not found.', 404);

    const gift = await this.giftsRepository.findGiftById(giftId);
    if (!gift) throw new AppError('Gift not found.', 404);

    if (giftedQuantity > gift.quantity)
      throw new AppError('Requested quantity exceeds available gift quantity.', 409);

    const guestRecords = await this.guestsRepository.findWeddingsByGuestId(userId);
    const guestWeddingIds = guestRecords.map((record) => record.referencedWedding);
    const weddingRole = WeddingAccessPolicies.getUserRoleOnWedding({
      userId,
      wedding,
      guestWeddingIds,
    });

    if (!WeddingAccessPolicies.isGiftContributionAllowed(weddingRole))
      throw new AppError('User does not have permission to perform this action.', 403);

    const updatedQuantity = gift.quantity - giftedQuantity;

    await this.giftsRepository.updateGiftQuantity({ giftId, updatedQuantity });

    await this.giftContributionsRepository.registerGiftContribution({
      giftId,
      presenter: userId,
      quantity: giftedQuantity,
      relatedWedding: weddingId,
    });

    return {
      message: 'Gift contribution registered successfully.',
    };
  }
}
