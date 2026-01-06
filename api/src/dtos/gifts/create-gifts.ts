import { GiftStruct } from '@/types/gifts/gift';

export interface CreateGiftsDto {
  quantity: number;
  productName: string;
  productLink: string;
  fromWedding: number;
}

export interface CreateGiftsServiceDto {
  gifts: GiftStruct[];
  userId: string;
  weddingId: number;
}
