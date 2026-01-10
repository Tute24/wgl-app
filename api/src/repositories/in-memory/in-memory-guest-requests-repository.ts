import { CreateGuestRequestDto } from '@/dtos/guest-requests/create-guest-request';
import { GuestRequestsRepository } from '../guest-requests-repository';
import { GuestRequest } from '@prisma/client';
import { GetGuestRequestsHistoryResponse } from '@/types/guest-requests/get-guest-requests-history-response';
import { AuthRepository } from '../auth-repository';
import { WeddingsRepository } from '../weddings-repository';

export class InMemoryGuestRequestsRepository implements GuestRequestsRepository {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
  ) {}
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

  async getGuestRequestsHistory(userId: string) {
    const ownWeddings = await this.weddingsRepository.getOwnWeddings(userId);
    if (ownWeddings.length === 0) return [];

    const weddingIds = ownWeddings.map((wedding) => wedding.id);

    const requests = await Promise.all(
      this.guestRequestsDb
        .filter((request) => weddingIds.includes(request.relatedWedding))
        .map(async (request) => {
          const wedding = ownWeddings.find((wedding) => wedding.id === request.relatedWedding);
          const user = await this.authRepository.findById(request.requestBy);

          if (!wedding || !user) return null;

          const response: GetGuestRequestsHistoryResponse = {
            id: request.id,
            requestBy: request.requestBy,
            relatedWedding: request.relatedWedding,
            pending: request.pending,
            accepted: request.accepted,
            madeOn: request.madeOn,
            wedding,
            user,
          };

          return response;
        }),
    );

    return requests.filter((request) => request !== null);
  }
}
