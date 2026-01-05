import type { CreateWeddingRepositoryDto } from '@/dtos/weddings/create-wedding.js';
import type { WeddingsRepository } from '../weddings-repository.js';
import prisma from '@/lib/prisma.js';

export class PrismaWeddingsRepository implements WeddingsRepository {
  async createWedding(data: CreateWeddingRepositoryDto) {
    const wedding = await prisma.wedding.create({ data });
    return wedding;
  }

  async getOwnWeddings(userId: string) {
    const ownWeddings = await prisma.wedding.findMany({
      where: {
        createdBy: userId,
      },
    });

    return ownWeddings;
  }

  async getInvitedWeddings(userId: string) {
    const invitedWeddings = await prisma.wedding.findMany({
      where: {
        guests: {
          some: {
            guestId: userId,
          },
        },
      },
    });

    return invitedWeddings;
  }

  async findWeddingById(weddingId: number) {
    const wedding = await prisma.wedding.findUnique({
      where: {
        id: weddingId,
      },
    });

    return wedding;
  }

  async deleteWedding(weddingId: number) {
    await prisma.wedding.delete({
      where: {
        id: weddingId,
      },
    });
  }
}
