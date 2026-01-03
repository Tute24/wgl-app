import type { Guest } from '@prisma/client';
import type { GuestsRepository } from '../guests-repository.js';

export class InMemoryGuestsRepository implements GuestsRepository {
  public guestsDb: Guest[] = [];
  async addGuest(guestId: string, referencedWedding: number) {
    const guest: Guest = {
      id: this.guestsDb.length + 1,
      guestId,
      referencedWedding,
      addedOn: new Date(),
    };

    this.guestsDb.push(guest);
  }

  async findWeddingsByGuestId(guestId: string) {
    const guestRecords: Guest[] = this.guestsDb.filter((record) => record.guestId === guestId);
    return guestRecords;
  }
}
