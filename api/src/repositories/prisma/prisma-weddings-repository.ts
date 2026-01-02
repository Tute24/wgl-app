import type { CreateWeddingRepositoryDto } from '@/dtos/weddings/create-wedding.js';
import type { WeddingsRepository } from '../weddings-repository.js';
import prisma from '@/lib/prisma.js';

export class PrismaWeddingsRepository implements WeddingsRepository {
  async createWedding(data: CreateWeddingRepositoryDto) {
    const wedding = await prisma.wedding.create({ data });
    return wedding;
  }
}
