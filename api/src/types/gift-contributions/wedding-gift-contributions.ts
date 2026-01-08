import { UserStruct } from '../users/user';

export type WeddingGiftContributions = {
  id: number;
  presenter: string;
  quantity: number;
  giftedAt: Date | null;
  relatedWedding: number;
  giftId: number;
  user: UserStruct;
};
