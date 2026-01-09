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
}
