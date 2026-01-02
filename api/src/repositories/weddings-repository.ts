import type { CreateWeddingRepositoryDto } from '@/dtos/weddings/create-wedding.js';
import type { Wedding } from '@prisma/client';

export interface WeddingsRepository {
  createWedding(data: CreateWeddingRepositoryDto): Promise<Wedding>;
}
