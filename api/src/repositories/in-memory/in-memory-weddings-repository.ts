import type { CreateWeddingRepositoryDto } from '@/dtos/weddings/create-wedding.js';
import type { Wedding } from '@prisma/client';
import type { WeddingsRepository } from '../weddings-repository.js';

export class InMemoryWeddingsRepository implements WeddingsRepository {
  public weddingDb: Wedding[] = [];
  async createWedding(data: CreateWeddingRepositoryDto) {
    const wedding = {
      id: 1,
      weddingTitle: data.weddingTitle,
      weddingDate: data.weddingDate,
      shippingAddress: data.shippingAddress ? data.shippingAddress : '',
      createdBy: data.createdBy,
      createdAt: new Date(),
    };

    this.weddingDb.push(wedding);

    return wedding;
  }
}
