import { CreateGuestRequestDto } from '@/dtos/guest-requests/create-guest-request';
import { AuthRepository } from '@/repositories/auth-repository';
import { GuestRequestsRepository } from '@/repositories/guest-requests-repository';
import { WeddingsRepository } from '@/repositories/weddings-repository';
import { AppError } from '@/utils/app-error';

export class CreateGuestRequestService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
    private guestRequestsRepository: GuestRequestsRepository,
  ) {}

  async execute({ userId, weddingId }: CreateGuestRequestDto): Promise<{ message: string }> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const wedding = await this.weddingsRepository.findWeddingById(weddingId);
    if (!wedding) throw new AppError('Wedding not found.', 404);

    if (wedding.createdBy === user.id) throw new AppError('User is the wedding owner.', 409);

    const pendingRequests = await this.guestRequestsRepository.findPendingRequestsByUserAndWedding(
      userId,
      weddingId,
    );

    if (pendingRequests.length > 0)
      throw new AppError('User currently has a pending guest request for this wedding', 409);

    await this.guestRequestsRepository.createRequest({
      userId,
      weddingId,
    });

    return {
      message: 'Request created successfully.',
    };
  }
}
