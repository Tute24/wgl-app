import type { GiftStruct } from '@/types/gifts/gift.js';

export interface CreateWeddingServiceDto {
  weddingTitle: string;
  weddingDate: string;
  userId: string;
  shippingAddress?: string;
  gifts: GiftStruct[];
}

export interface CreateWeddingRepositoryDto {
  weddingTitle: string;
  weddingDate: string;
  createdBy: string;
  shippingAddress?: string;
}
