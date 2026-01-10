import { GetGuestRequestsHistoryDto } from '@/dtos/guest-requests/get-guest-requests-history';
import { AuthRepository } from '@/repositories/auth-repository';
import { GuestRequestsRepository } from '@/repositories/guest-requests-repository';
import { GetGuestRequestsHistoryServiceResponse } from '@/types/guest-requests/get-guest-requests-history-response';
import { AppError } from '@/utils/app-error';

export class GetGuestRequestsHistoryService {
  constructor(
    private authRepository: AuthRepository,
    private guestRequestsRepository: GuestRequestsRepository,
  ) {}

  async execute({
    userId,
  }: GetGuestRequestsHistoryDto): Promise<GetGuestRequestsHistoryServiceResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const requests = await this.guestRequestsRepository.getGuestRequestsHistory(userId);

    return {
      requests,
    };
  }
}
