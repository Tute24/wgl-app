import { GiftDisplayStruct } from '@/types/gifts/gift';

export interface CreateGiftsDto {
  quantity: number;
  productName: string;
  productLink: string;
  fromWedding: number;
}

export interface CreateGiftsServiceDto {
  gifts: GiftDisplayStruct[];
  userId: string;
  weddingId: number;
}
