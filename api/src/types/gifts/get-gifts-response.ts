import { WeddingRole } from '@/enums/weddings/wedding-role';
import { Gift } from '@prisma/client';

export type GetGiftsResponse = {
  weddingRole: WeddingRole;
  gifts: Gift[];
};
