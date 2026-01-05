import type { CreateWeddingServiceDto } from '@/dtos/weddings/create-wedding';
import type { AuthRepository } from '@/repositories/auth-repository';
import type { GiftsRepository } from '@/repositories/gifts-repository';
import type { WeddingsRepository } from '@/repositories/weddings-repository';
import type { WeddingStruct } from '@/types/weddings/wedding';
import { AppError } from '@/utils/app-error';

export class CreateWeddingService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
    private giftsRepository: GiftsRepository,
  ) {}

  async execute({
    weddingTitle,
    weddingDate,
    userId,
    shippingAddress,
    gifts,
  }: CreateWeddingServiceDto): Promise<{ wedding: WeddingStruct }> {
    const user = await this.authRepository.findById(userId);

    if (!user) throw new AppError('User not found.', 404);

    const wedding = await this.weddingsRepository.createWedding({
      weddingTitle,
      weddingDate,
      shippingAddress: shippingAddress ? shippingAddress : '',
      createdBy: user.id,
    });

    const giftsWithFromWedding = gifts.map((item) => ({ ...item, fromWedding: wedding.id }));

    await this.giftsRepository.createGifts(giftsWithFromWedding);

    return { wedding };
  }
}
