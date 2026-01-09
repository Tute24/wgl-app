import { CreateGuestRequestDto } from '@/dtos/guest-requests/create-guest-request';
import { GuestRequest } from '@prisma/client';

export interface GuestRequestsRepository {
  createRequest(data: CreateGuestRequestDto): Promise<void>;
  findPendingRequestsByUserAndWedding(userId: string, weddingId: number): Promise<GuestRequest[]>;
}
