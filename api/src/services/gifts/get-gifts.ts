import { GetGiftsDto } from '@/dtos/gifts/get-gifts';
import { AuthRepository } from '@/repositories/auth-repository';
import { GiftsRepository } from '@/repositories/gifts-repository';
import { GuestsRepository } from '@/repositories/guests-repository';
import { WeddingsRepository } from '@/repositories/weddings-repository';
import { GetGiftsResponse } from '@/types/gifts/get-gifts-response';
import { AppError } from '@/utils/app-error';

export class GetGiftsService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
    private guestsRepository: GuestsRepository,
    private giftsRepository: GiftsRepository,
  ) {}

  async execute({ userId, weddingId }: GetGiftsDto): Promise<GetGiftsResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const wedding = await this.weddingsRepository.findWeddingById(weddingId);
    if (!wedding) throw new AppError('Wedding not found.', 404);

    let weddingRole: GetGiftsResponse['weddingRole'] = 'NONE';
    const guestRecords = await this.guestsRepository.findWeddingsByGuestId(userId);
    const weddingsThatUserIsGuestAt = guestRecords.map((record) => record.referencedWedding);
    if (wedding.createdBy === user.id) {
      weddingRole = 'OWNER';
    } else if (weddingsThatUserIsGuestAt.includes(wedding.id)) {
      weddingRole = 'GUEST';
    }

    const gifts =
      weddingRole !== 'NONE' ? await this.giftsRepository.getGiftsFromWedding(weddingId) : [];

    return {
      weddingRole,
      gifts,
    };
  }
}
