import { RegisterGiftContributionRepositoryDto } from '@/dtos/gift-contributions/register-gift-contribution';
import { WeddingGiftContributions } from '@/types/gift-contributions/wedding-gift-contributions';

export interface GiftContributionsRepository {
  registerGiftContribution(data: RegisterGiftContributionRepositoryDto): Promise<void>;
  findGiftContributionsByWeddingId(weddingId: number): Promise<WeddingGiftContributions[]>;
}
