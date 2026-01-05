import type { CreateWeddingRepositoryDto } from '@/dtos/weddings/create-wedding.js';
import type { Wedding } from '@prisma/client';
import type { WeddingsRepository } from '../weddings-repository.js';
import type { GuestsRepository } from '../guests-repository.js';

export class InMemoryWeddingsRepository implements WeddingsRepository {
  constructor(private guestsRepository: GuestsRepository) {}
  public weddingDb: Wedding[] = [];
  async createWedding(data: CreateWeddingRepositoryDto) {
    const wedding = {
      id: this.weddingDb.length + 1,
      weddingTitle: data.weddingTitle,
      weddingDate: data.weddingDate,
      shippingAddress: data.shippingAddress ? data.shippingAddress : '',
      createdBy: data.createdBy,
      createdAt: new Date(),
    };

    this.weddingDb.push(wedding);

    return wedding;
  }

  async getOwnWeddings(userId: string) {
    const ownWeddings = this.weddingDb.filter((wedding) => wedding.createdBy === userId);

    return ownWeddings;
  }

  async getInvitedWeddings(userId: string) {
    const guestRecords = await this.guestsRepository.findWeddingsByGuestId(userId);
    const invitedWeddings: Wedding[] = [];
    for (let i = 0; i < guestRecords.length; i++) {
      const referencedWeddingId = guestRecords[i]?.referencedWedding;
      const invitedWeddingRecord = this.weddingDb.find(
        (wedding) => wedding.id === referencedWeddingId,
      );
      if (invitedWeddingRecord) invitedWeddings.push(invitedWeddingRecord);
    }

    return invitedWeddings;
  }

  async findWeddingById(weddingId: number) {
    const wedding = this.weddingDb.find((wedding) => wedding.id === weddingId);

    if (!wedding) return null;

    return wedding;
  }

  async deleteWedding(weddingId: number) {
    const weddingIndex = this.weddingDb.findIndex((wedding) => wedding.id === weddingId);
    this.weddingDb.splice(weddingIndex, 1);
  }
}
