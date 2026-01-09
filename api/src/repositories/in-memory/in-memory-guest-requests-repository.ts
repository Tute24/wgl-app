import { CreateGuestRequestDto } from '@/dtos/guest-requests/create-guest-request';
import { GuestRequestsRepository } from '../guest-requests-repository';
import { GuestRequest } from '@prisma/client';

export class InMemoryGuestRequestsRepository implements GuestRequestsRepository {
  public guestRequestsDb: GuestRequest[] = [];
  async createRequest(data: CreateGuestRequestDto) {
    const guestRequest: GuestRequest = {
      id: this.guestRequestsDb.length + 1,
      requestBy: data.userId,
      relatedWedding: data.weddingId,
      accepted: false,
      madeOn: new Date(),
      pending: true,
    };

    this.guestRequestsDb.push(guestRequest);
  }

  async findPendingRequestsByUserAndWedding(userId: string, weddingId: number) {
    const requests = this.guestRequestsDb.filter(
      (request) =>
        request.requestBy === userId &&
        request.relatedWedding === weddingId &&
        request.pending === true,
    );

    return requests;
  }
}
