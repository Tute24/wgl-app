import { CountPendingGuestRequestsDto } from '@/dtos/guest-requests/count-pending-guest-requests';
import { AuthRepository } from '@/repositories/auth-repository';
import { GuestRequestsRepository } from '@/repositories/guest-requests-repository';
import { CountPendingGuestRequestsResponse } from '@/types/guest-requests/count-pending-guest-requests-response';
import { AppError } from '@/utils/app-error';

export class CountPendingGuestRequestsService {
  constructor(
    private authRepository: AuthRepository,
    private guestRequestsRepository: GuestRequestsRepository,
  ) {}

  async execute({
    userId,
  }: CountPendingGuestRequestsDto): Promise<CountPendingGuestRequestsResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const ownWeddingsPendingGuestRequests =
      await this.guestRequestsRepository.getPendingGuestRequestsFromOwnWeddings(userId);

    return {
      pendingGuestRequests: ownWeddingsPendingGuestRequests.length,
    };
  }
}
