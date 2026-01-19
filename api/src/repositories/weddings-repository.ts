import type { CreateWeddingRepositoryDto } from '@/dtos/weddings/create-wedding';
import { InvitedWeddingType } from '@/types/weddings/wedding';
import type { Wedding } from '@prisma/client';

export interface WeddingsRepository {
  createWedding(data: CreateWeddingRepositoryDto): Promise<Wedding>;
  getOwnWeddings(userId: string): Promise<Wedding[]>;
  getInvitedWeddings(userId: string): Promise<InvitedWeddingType[]>;
  findWeddingById(weddingId: number): Promise<Wedding | null>;
  deleteWedding(weddingId: number): Promise<void>;
}
