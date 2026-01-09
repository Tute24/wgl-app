import { CreateGuestRequestDto } from '@/dtos/guest-requests/create-guest-request';

export interface GuestRequestsRepository {
  createRequest(data: CreateGuestRequestDto): Promise<void>;
}
