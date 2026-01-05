import type { CreateWeddingRepositoryDto } from '@/dtos/weddings/create-wedding.js';
import type { Wedding } from '@prisma/client';

export interface WeddingsRepository {
  createWedding(data: CreateWeddingRepositoryDto): Promise<Wedding>;
  getOwnWeddings(userId: string): Promise<Wedding[]>;
  getInvitedWeddings(userId: string): Promise<Wedding[]>;
  findWeddingById(weddingId: number): Promise<Wedding | null>;
  deleteWedding(weddingId: number): Promise<void>;
}
