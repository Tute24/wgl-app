import type { CreateWeddingRepositoryDto } from '@/dtos/weddings/create-wedding';
import type { WeddingsRepository } from '../weddings-repository';
import prisma from '@/lib/prisma';

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
      omit: {
        createdBy: true,
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
