import { GuestsRepository } from '../guests-repository';
import prisma from '@/lib/prisma';

export class PrismaGuestsRepository implements GuestsRepository {
  async addGuest(guestId: string, referencedWedding: number) {
    await prisma.guest.create({
      data: { guestId, referencedWedding },
    });
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
