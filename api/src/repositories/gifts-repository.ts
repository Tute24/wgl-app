import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts';
import { UpdateGiftDataRepositoryDto } from '@/dtos/gifts/update-gift-data';
import { UpdateQuantityDto } from '@/dtos/gifts/update-quantity';
import { Gift } from '@prisma/client';

export interface GiftsRepository {
  createGifts(data: CreateGiftsDto[]): Promise<void>;
  getGiftsFromWedding(weddingId: number): Promise<Gift[]>;
  findGiftById(giftId: number): Promise<Gift | null>;
  deleteGift(giftId: number): Promise<void>;
  updateGiftQuantity(data: UpdateQuantityDto): Promise<Gift>;
  updateGiftData(data: UpdateGiftDataRepositoryDto): Promise<void>;
}
