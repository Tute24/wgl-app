import type { GetWeddingsDto } from '@/dtos/weddings/get-weddings.js';
import type { AuthRepository } from '@/repositories/auth-repository.js';
import type { WeddingsRepository } from '@/repositories/weddings-repository.js';
import type { GetWeddingsResponse } from '@/types/weddings/wedding.js';
import { AppError } from '@/utils/app-error.js';

export class GetWeddingsService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
  ) {}

  async execute({ userId }: GetWeddingsDto): Promise<GetWeddingsResponse> {
    const user = await this.authRepository.findById(userId);

    if (!user) throw new AppError('User not found.', 404);

    const ownWeddings = await this.weddingsRepository.getOwnWeddings(userId);
    const invitedWeddings = await this.weddingsRepository.getInvitedWeddings(userId);

    return {
      ownWeddings,
      invitedWeddings,
    };
  }
}
