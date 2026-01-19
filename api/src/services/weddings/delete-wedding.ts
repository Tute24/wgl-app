import type { DeleteWeddingDto } from '@/dtos/weddings/delete-wedding';
import type { AuthRepository } from '@/repositories/auth-repository';
import type { WeddingsRepository } from '@/repositories/weddings-repository';
import { AppError } from '@/utils/app-error';

export class DeleteWeddingService {
  constructor(
    private authRepository: AuthRepository,
    private weddingsRepository: WeddingsRepository,
  ) {}

  async execute({ userId, weddingId }: DeleteWeddingDto): Promise<{ message: string }> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new AppError('User not found.', 404);

    const wedding = await this.weddingsRepository.findWeddingById(weddingId);
    if (!wedding) throw new AppError('Wedding not found.', 404);

    if (user.id !== wedding.createdBy)
      throw new AppError('User does not have permission to perform this action.', 403);

    await this.weddingsRepository.deleteWedding(weddingId);

    return { message: 'Wedding successfully deleted.' };
  }
}
