import type { CreateWeddingServiceDto } from '@/dtos/weddings/create-wedding.js';
import type { GiftsRepository } from '@/repositories/gifts-repository.js';
import type { UsersRepository } from '@/repositories/users-repository.js';
import type { WeddingsRepository } from '@/repositories/weddings-repository.js';
import type { WeddingStruct } from '@/types/weddings/wedding.js';
import { AppError } from '@/utils/app-error.js';

export class CreateWeddingService {
  constructor(
    private usersRepository: UsersRepository,
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
    const user = await this.usersRepository.findById(userId);

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
