import { CreateGuestRequestDto } from '@/dtos/guest-requests/create-guest-request';
import { GetGuestRequestsHistoryResponse } from '@/types/guest-requests/get-guest-requests-history-response';
import { GuestRequest, Prisma } from '@prisma/client';

export interface GuestRequestsRepository {
  createRequest(data: CreateGuestRequestDto): Promise<void>;
  findPendingRequestsByUserAndWedding(userId: string, weddingId: number): Promise<GuestRequest[]>;
  getGuestRequestsHistory(userId: string): Promise<GetGuestRequestsHistoryResponse[]>;
  findGuestRequestById(guestRequestId: number): Promise<Prisma.GuestRequestGetPayload<{
    include: {
      wedding: true;
    };
  }> | null>;
  acceptGuestRequest(guestRequestId: number): Promise<void>;
  denyGuestRequest(guestRequestId: number): Promise<void>;
  getPendingGuestRequestsFromOwnWeddings(userId: string): Promise<GuestRequest[]>;
}
