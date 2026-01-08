import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts';
import type { GiftsRepository } from '../gifts-repository';
import type { Gift } from '@prisma/client';
import { UpdateQuantityDto } from '@/dtos/gifts/update-quantity';
import { UpdateGiftDataRepositoryDto } from '@/dtos/gifts/update-gift-data';

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

  async getGiftsFromWedding(weddingId: number) {
    const giftsList = this.giftDb.filter((gift) => gift.fromWedding === weddingId);
    return giftsList;
  }

  async findGiftById(giftId: number) {
    const gift = this.giftDb.find((gift) => gift.id === giftId);

    if (!gift) return null;

    return gift;
  }

  async deleteGift(giftId: number) {
    const weddingIndex = this.giftDb.findIndex((gift) => gift.id === giftId);
    this.giftDb.splice(weddingIndex, 1);
  }

  async updateGiftQuantity(data: UpdateQuantityDto) {
    const gifts = this.giftDb.map((gift) =>
      gift.id === data.giftId ? { ...gift, quantity: data.updatedQuantity } : gift,
    );

    const gift = gifts.find((gift) => gift.id === data.giftId);
    return gift!;
  }

  async updateGiftData(data: UpdateGiftDataRepositoryDto) {
    const giftRecordIndex = this.giftDb.findIndex((record) => record.id === data.giftId);
    const giftRecord = this.giftDb.find((record) => record.id === data.giftId);

    const updatedGiftRecord = {
      ...giftRecord!,
      quantity: data.updateData.quantity ?? giftRecord!.quantity,
      productName: data.updateData.productName ?? giftRecord!.productName,
      productLink: data.updateData.productLink ?? giftRecord!.productLink,
    };

    this.giftDb.splice(giftRecordIndex, 1, updatedGiftRecord);
  }
}
