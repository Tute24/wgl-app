import type { GiftDisplayStruct } from '@/types/gifts/gift';

export interface CreateWeddingServiceDto {
  weddingTitle: string;
  weddingDate: string;
  userId: string;
  shippingAddress?: string;
  gifts: GiftDisplayStruct[];
}

export interface CreateWeddingRepositoryDto {
  weddingTitle: string;
  weddingDate: string;
  createdBy: string;
  shippingAddress?: string;
}
