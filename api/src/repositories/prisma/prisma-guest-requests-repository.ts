import { CreateGuestRequestDto } from '@/dtos/guest-requests/create-guest-request';
import { GuestRequestsRepository } from '../guest-requests-repository';
import prisma from '@/lib/prisma';

export class PrismaGuestRequestsRepository implements GuestRequestsRepository {
  async createRequest(data: CreateGuestRequestDto) {
    await prisma.guestRequest.create({
      data: {
        requestBy: data.userId,
        relatedWedding: data.weddingId,
      },
    });
  }

  async findPendingRequestsByUserAndWedding(userId: string, weddingId: number) {
    const requests = await prisma.guestRequest.findMany({
      where: {
        requestBy: userId,
        relatedWedding: weddingId,
        pending: true,
      },
    });

    return requests;
  }

  async getGuestRequestsHistory(userId: string) {
    const requests = await prisma.guestRequest.findMany({
      where: {
        wedding: {
          createdBy: userId,
        },
      },
      include: {
        wedding: true,
        user: true,
      },
    });

    return requests;
  }

  async findGuestRequestById(guestRequestId: number) {
    const guestRequest = await prisma.guestRequest.findUnique({
      where: {
        id: guestRequestId,
      },
    });

    return guestRequest;
  }

  async acceptGuestRequest(guestRequestId: number) {
    await prisma.guestRequest.update({
      where: {
        id: guestRequestId,
      },
      data: {
        accepted: true,
        pending: false,
      },
    });
  }
}
