import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts';
import { Gift } from '@prisma/client';

export interface GiftsRepository {
  createGifts(data: CreateGiftsDto[]): Promise<void>;
  getGiftsFromWedding(weddingId: number): Promise<Gift[]>;
}
