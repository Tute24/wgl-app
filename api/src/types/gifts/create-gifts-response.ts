import { Gift } from '@prisma/client';

export type CreateGiftsResponse = {
  giftsList: Gift[];
};
