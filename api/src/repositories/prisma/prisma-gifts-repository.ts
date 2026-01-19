import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts';
import type { GiftsRepository } from '../gifts-repository';
import prisma from '@/lib/prisma';
import { UpdateQuantityDto } from '@/dtos/gifts/update-quantity';
import { UpdateGiftDataRepositoryDto } from '@/dtos/gifts/update-gift-data';

export class PrismaGiftsRepository implements GiftsRepository {
  async createGifts(data: CreateGiftsDto[]) {
    await prisma.gift.createMany({ data });
  }

  async getGiftsFromWedding(weddingId: number) {
    const gifts = await prisma.gift.findMany({
      where: {
        fromWedding: weddingId,
      },
    });

    return gifts;
  }

  async findGiftById(giftId: number) {
    const gift = await prisma.gift.findUnique({
      where: {
        id: giftId,
      },
    });

    if (!gift) return null;

    return gift;
  }

  async deleteGift(giftId: number) {
    await prisma.gift.delete({
      where: {
        id: giftId,
      },
    });
  }

  async updateGiftQuantity(data: UpdateQuantityDto) {
    const gift = await prisma.gift.update({
      where: {
        id: data.giftId,
      },
      data: {
        quantity: data.updatedQuantity,
      },
    });

    return gift;
  }

  async updateGiftData(data: UpdateGiftDataRepositoryDto) {
    await prisma.gift.update({
      where: {
        id: data.giftId,
      },
      data: data.updateData,
    });
  }
}
