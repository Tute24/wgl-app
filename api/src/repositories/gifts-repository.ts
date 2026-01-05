import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts';

export interface GiftsRepository {
  createGifts(data: CreateGiftsDto[]): Promise<void>;
}
