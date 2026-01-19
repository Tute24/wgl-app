import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGiftContributionsRepository } from '@/repositories/in-memory/in-memory-gift-contributions-repository';
import { InMemoryGiftsRepository } from '@/repositories/in-memory/in-memory-gifts-repository';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { GetGiftContributionsService } from '../get-gift-contributions';
import { beforeEach, describe, expect, it } from 'vitest';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { hash } from 'bcryptjs';
import { giftsMock } from '../__mocks__/gifts-mock';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let giftsRepository: InMemoryGiftsRepository;
let giftContributionsRepository: InMemoryGiftContributionsRepository;
let sut: GetGiftContributionsService;

describe('GetGiftContributionsService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    giftsRepository = new InMemoryGiftsRepository();
    giftContributionsRepository = new InMemoryGiftContributionsRepository(
      authRepository,
      giftsRepository,
    );

    sut = new GetGiftContributionsService(
      authRepository,
      weddingsRepository,
      giftContributionsRepository,
    );
  });

  it('should get gift contributions successfully', async () => {
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

    const treatedGifts = giftsMock.gifts.map((gift) => ({ ...gift, fromWedding: wedding.id }));

    await giftsRepository.createGifts(treatedGifts);
    const giftsList = await giftsRepository.getGiftsFromWedding(wedding.id);

    await giftContributionsRepository.registerGiftContribution({
      giftId: giftsList[0]!.id,
      presenter: user.id,
      quantity: 1,
      relatedWedding: wedding.id,
    });

    const { giftContributions, weddingHeader } = await sut.execute({
      userId: user.id,
      weddingId: wedding.id,
    });

    expect(giftContributions).toHaveLength(1);
    expect(weddingHeader.weddingTitle).toEqual(weddingMock.weddingTitle);
  });

  it('should not fetch contributions if user is not the wedding owner', async () => {
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

    const treatedGifts = giftsMock.gifts.map((gift) => ({ ...gift, fromWedding: wedding.id }));

    await giftsRepository.createGifts(treatedGifts);
    const giftsList = await giftsRepository.getGiftsFromWedding(wedding.id);

    await giftContributionsRepository.registerGiftContribution({
      giftId: giftsList[0]!.id,
      presenter: user1.id,
      quantity: 1,
      relatedWedding: wedding.id,
    });

    await expect(
      sut.execute({
        userId: user2.id,
        weddingId: wedding.id,
      }),
    ).rejects.toThrow('User does not have permission to perform this action.');
  });

  it('should return user not found', async () => {
    await expect(
      sut.execute({
        userId: 'id',
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
        weddingId: 1,
      }),
    ).rejects.toThrow('Wedding not found.');
  });
});
