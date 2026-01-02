import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts.js';
import type { GiftsRepository } from '../gifts-repository.js';
import prisma from '@/lib/prisma.js';

export class PrismaGiftsRepository implements GiftsRepository {
  async createGifts(data: CreateGiftsDto[]) {
    await prisma.gift.createMany({ data });
  }
}
