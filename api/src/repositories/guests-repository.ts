import type { Guest } from '@prisma/client';

export interface GuestsRepository {
  addGuest(guestId: string, referencedWedding: number): Promise<void>;
  findWeddingsByGuestId(guestId: string): Promise<Guest[]>;
}
