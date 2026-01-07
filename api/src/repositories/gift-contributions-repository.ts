import { RegisterGiftContributionRepositoryDto } from '@/dtos/gift-contributions/register-gift-contribution';

export interface GiftContributionsRepository {
  registerGiftContribution(data: RegisterGiftContributionRepositoryDto): Promise<void>;
}
