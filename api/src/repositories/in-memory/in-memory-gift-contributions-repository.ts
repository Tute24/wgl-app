import { GiftContribution } from '@prisma/client';
import { GiftContributionsRepository } from '../gift-contributions-repository';
import { RegisterGiftContributionRepositoryDto } from '@/dtos/gift-contributions/register-gift-contribution';

export class InMemoryGiftContributionsRepository implements GiftContributionsRepository {
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
}
