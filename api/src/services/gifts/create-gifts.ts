import { CreateGiftsDto, CreateGiftsServiceDto } from '@/dtos/gifts/create-gifts';
import { AuthRepository } from '@/repositories/auth-repository';
import { GiftsRepository } from '@/repositories/gifts-repository';
import { WeddingsRepository } from '@/repositories/weddings-repository';
import { CreateGiftsResponse } from '@/types/gifts/create-gifts-response';
import { AppError } from '@/utils/app-error';

export class CreateGiftsService {
  constructor(
    private authRepository: AuthRepository,
    private weddingRepository: WeddingsRepository,
    private giftsRepository: GiftsRepository,
  ) {}

  async execute({ userId, gifts, weddingId }: CreateGiftsServiceDto): Promise<CreateGiftsResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const wedding = await this.weddingRepository.findWeddingById(weddingId);
    if (!wedding) throw new AppError('Wedding not found.', 404);

    if (wedding.createdBy !== user.id)
      throw new AppError('User does not have permission to perform this action.', 403);

    const treatedGifts: CreateGiftsDto[] = gifts.map((gift) => ({
      ...gift,
      fromWedding: weddingId,
    }));

    await this.giftsRepository.createGifts(treatedGifts);

    const giftsList = await this.giftsRepository.getGiftsFromWedding(weddingId);

    return { giftsList };
  }
}
