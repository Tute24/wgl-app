import { WeddingStruct } from './wedding';

export type GetUserRoleOnWeddingType = {
  userId: string;
  wedding: WeddingStruct;
  guestWeddingIds: number[];
};
