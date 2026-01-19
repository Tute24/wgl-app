import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGiftsRepository } from '@/repositories/in-memory/in-memory-gifts-repository';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { CreateGiftsService } from '../create-gifts';
import { beforeEach, describe, expect, it } from 'vitest';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { hash } from 'bcryptjs';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { giftsMock } from '../__mocks__/gifts-mock';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let giftsRepository: InMemoryGiftsRepository;
let sut: CreateGiftsService;

describe('CreateGiftsService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    giftsRepository = new InMemoryGiftsRepository();
    sut = new CreateGiftsService(authRepository, weddingsRepository, giftsRepository);
  });
  it('should create gifts successfully', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const wedding = await weddingsRepository.createWedding({
      createdBy: user.id,
      weddingTitle: weddingMock.weddingTitle,
      weddingDate: weddingMock.weddingDate,
      shippingAddress: weddingMock.shippingAddress,
    });

    const { giftsList } = await sut.execute({
      userId: user.id,
      gifts: giftsMock.gifts,
      weddingId: wedding.id,
    });

    expect(giftsList).toHaveLength(2);
  });

  it('should return user not found', async () => {
    await expect(
      sut.execute({
        userId: 'user.id',
        gifts: giftsMock.gifts,
        weddingId: 1,
      }),
    ).rejects.toThrow('User not found.');
  });

  it('should return wedding not found', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    await expect(
      sut.execute({
        userId: user.id,
        gifts: giftsMock.gifts,
        weddingId: 1,
      }),
    ).rejects.toThrow('Wedding not found.');
  });

  it('should not allow user to create gifts if he is not the wedding owner', async () => {
    const user1 = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const user2 = await authRepository.createUser({
      email: 'user2@email.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: await hash(userMock.password, 6),
    });

    const wedding = await weddingsRepository.createWedding({
      createdBy: user1.id,
      weddingTitle: weddingMock.weddingTitle,
      weddingDate: weddingMock.weddingDate,
      shippingAddress: weddingMock.shippingAddress,
    });

    await expect(
      sut.execute({
        userId: user2.id,
        gifts: giftsMock.gifts,
        weddingId: wedding.id,
      }),
    ).rejects.toThrow('User does not have permission to perform this action.');
  });
});
