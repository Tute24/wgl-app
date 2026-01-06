import { GuestsRepository } from '../guests-repository';
import prisma from '@/lib/prisma';

export class PrismaGuestsRepository implements GuestsRepository {
  async addGuest(_guestId: string, _referencedWedding: number) {
    return;
  }

  async findWeddingsByGuestId(guestId: string) {
    const guestRecords = await prisma.guest.findMany({
      where: {
        guestId,
      },
    });

    return guestRecords;
  }
}
