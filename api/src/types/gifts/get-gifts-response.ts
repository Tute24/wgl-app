import { Gift } from '@prisma/client';

export type GetGiftsResponse = {
  weddingRole: 'OWNER' | 'GUEST' | 'NONE';
  gifts: Gift[];
};
