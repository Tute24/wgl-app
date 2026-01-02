import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts.js';
import type { GiftsRepository } from '../gifts-repository.js';
import type { Gift } from '@prisma/client';

export class InMemoryGiftsRepository implements GiftsRepository {
  public giftDb: Gift[] = [];
  async createGifts(data: CreateGiftsDto[]) {
    for (let i = 0; i < data.length; i++) {
      const gift = {
        id: i + 1,
        quantity: data[i]!.quantity,
        productName: data[i]!.productName,
        productLink: data[i]!.productLink,
        fromWedding: data[i]!.fromWedding,
        createdAt: new Date(),
      };

      this.giftDb.push(gift);
    }
  }
}
