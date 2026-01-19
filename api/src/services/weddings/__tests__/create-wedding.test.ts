import { CreateWeddingService } from '../create-wedding';
import { beforeEach, describe, expect, it } from 'vitest';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { hash } from 'bcryptjs';
import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { InMemoryGiftsRepository } from '@/repositories/in-memory/in-memory-gifts-repository';
import { weddingMock } from '../__mocks__/wedding-mock';
import { giftsMock } from '@/services/gifts/__mocks__/gifts-mock';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';

let authRepository: InMemoryAuthRepository;
let weddingRepository: InMemoryWeddingsRepository;
let giftsRepository: InMemoryGiftsRepository;
let guestsRepository: InMemoryGuestsRepository;
let sut: CreateWeddingService;

describe('CreateWeddingService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingRepository = new InMemoryWeddingsRepository(guestsRepository);
    giftsRepository = new InMemoryGiftsRepository();
    sut = new CreateWeddingService(authRepository, weddingRepository, giftsRepository);
  });
  it('should create the wedding successfully', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const response = await sut.execute({
      weddingTitle: weddingMock.weddingTitle,
      weddingDate: weddingMock.createdAt,
      shippingAddress: weddingMock.shippingAddress,
      userId: user.id,
      gifts: giftsMock.gifts,
    });

    expect(response.wedding.weddingTitle).toEqual(weddingMock.weddingTitle);
    expect(response.wedding.id).toEqual(1);
    expect(giftsRepository.giftDb).toHaveLength(2);
  });

  it('should return user not found', async () => {
    await expect(
      sut.execute({
        weddingTitle: weddingMock.weddingTitle,
        weddingDate: weddingMock.createdAt,
        shippingAddress: weddingMock.shippingAddress,
        userId: 'user-1-id',
        gifts: giftsMock.gifts,
      }),
    ).rejects.toThrow('User not found.');
  });
});
