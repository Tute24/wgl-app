import { AcceptGuestRequestDto } from '@/dtos/guest-requests/accept-guest-request';
import { AuthRepository } from '@/repositories/auth-repository';
import { GuestRequestsRepository } from '@/repositories/guest-requests-repository';
import { GuestsRepository } from '@/repositories/guests-repository';
import { AppError } from '@/utils/app-error';

export class AcceptGuestRequestService {
  constructor(
    private authRepository: AuthRepository,
    private guestsRepository: GuestsRepository,
    private guestRequestsRepository: GuestRequestsRepository,
  ) {}

  async execute({ guestRequestId, userId }: AcceptGuestRequestDto): Promise<{ message: string }> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const guestRequest = await this.guestRequestsRepository.findGuestRequestById(guestRequestId);
    if (!guestRequest) throw new AppError('Guest Request not found.', 404);

    if (guestRequest.wedding.createdBy !== user.id)
      throw new AppError('User does not have permission to perform this action.', 403);

    if (!guestRequest.pending) throw new AppError('This request has already been reviewed.', 409);

    await this.guestRequestsRepository.acceptGuestRequest(guestRequestId);
    await this.guestsRepository.addGuest(user.id, guestRequest.wedding.id);

    return {
      message: 'Requested successfully accepted.',
    };
  }
}
