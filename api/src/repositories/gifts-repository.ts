import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts.js';

export interface GiftsRepository {
  createGifts(data: CreateGiftsDto[]): Promise<void>;
}
