import { CreateGuestRequestDto } from '@/dtos/requests/create-request';

export interface GuestRequestsRepository {
  createRequest(data: CreateGuestRequestDto): Promise<void>;
}
