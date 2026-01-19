import { GiftContribution } from '@prisma/client';
import { GiftContributionsRepository } from '../gift-contributions-repository';
import { RegisterGiftContributionRepositoryDto } from '@/dtos/gift-contributions/register-gift-contribution';
import { WeddingGiftContributions } from '@/types/gift-contributions/wedding-gift-contributions';
import { AuthRepository } from '../auth-repository';
import { GiftsRepository } from '../gifts-repository';

export class InMemoryGiftContributionsRepository implements GiftContributionsRepository {
  constructor(
    private authRepository: AuthRepository,
    private giftsRepository: GiftsRepository,
  ) {}
  public giftContributionsDb: GiftContribution[] = [];

  async registerGiftContribution(data: RegisterGiftContributionRepositoryDto) {
    const giftContribution: GiftContribution = {
      id: this.giftContributionsDb.length + 1,
      presenter: data.presenter,
      giftId: data.giftId,
      quantity: data.quantity,
      relatedWedding: data.relatedWedding,
      giftedAt: new Date(),
    };

    this.giftContributionsDb.push(giftContribution);
  }

  async findGiftContributionsByWeddingId(weddingId: number) {
    const contributionRecordsByWedding = this.giftContributionsDb.filter(
      (record) => record.relatedWedding === weddingId,
    );

    let weddingGiftContributions: WeddingGiftContributions[] = [];

    for (const contribution of contributionRecordsByWedding) {
      const user = await this.authRepository.findById(contribution.presenter);
      const gift = await this.giftsRepository.findGiftById(contribution.giftId);

      weddingGiftContributions.push({
        ...contribution,
        user: user!,
        gift: gift!,
      });
    }

    return weddingGiftContributions;
  }
}
