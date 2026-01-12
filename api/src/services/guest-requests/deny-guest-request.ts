import { DenyGuestRequestDto } from '@/dtos/guest-requests/deny-guest-request';
import { AuthRepository } from '@/repositories/auth-repository';
import { GuestRequestsRepository } from '@/repositories/guest-requests-repository';
import { AppError } from '@/utils/app-error';

export class DenyGuestRequestService {
  constructor(
    private authRepository: AuthRepository,
    private guestRequestsRepository: GuestRequestsRepository,
  ) {}

  async execute({ guestRequestId, userId }: DenyGuestRequestDto): Promise<{ message: string }> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const guestRequest = await this.guestRequestsRepository.findGuestRequestById(guestRequestId);
    if (!guestRequest) throw new AppError('Guest Request not found.', 404);

    if (guestRequest.wedding.createdBy !== user.id)
      throw new AppError('User does not have permission to perform this action.', 403);

    if (!guestRequest.pending) throw new AppError('This request has already been reviewed.', 409);

    await this.guestRequestsRepository.acceptGuestRequest(guestRequestId);

    return {
      message: 'Request successfully denied.',
    };
  }
}
