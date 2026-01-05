import type { CreateGiftsDto } from '@/dtos/gifts/create-gifts';
import type { GiftsRepository } from '../gifts-repository';
import prisma from '@/lib/prisma';

export class PrismaGiftsRepository implements GiftsRepository {
  async createGifts(data: CreateGiftsDto[]) {
    await prisma.gift.createMany({ data });
  }
}
