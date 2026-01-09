import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { RegisterGiftContributionService } from '../register-gift-contribution';
import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGiftsRepository } from '@/repositories/in-memory/in-memory-gifts-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { InMemoryGiftContributionsRepository } from '@/repositories/in-memory/in-memory-gift-contributions-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { hash } from 'bcryptjs';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { giftsMock } from '../__mocks__/gifts-mock';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let giftsRepository: InMemoryGiftsRepository;
let giftContributionsRepository: InMemoryGiftContributionsRepository;
let sut: RegisterGiftContributionService;

describe('RegisterGiftContribution', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    giftsRepository = new InMemoryGiftsRepository();
    giftContributionsRepository = new InMemoryGiftContributionsRepository(
      authRepository,
      giftsRepository,
    );
    sut = new RegisterGiftContributionService(
      authRepository,
      weddingsRepository,
      giftsRepository,
      guestsRepository,
      giftContributionsRepository,
    );
  });

  it('should successfully register a gift contribution', async () => {
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

    const { message } = await sut.execute({
      userId: user.id,
      giftedQuantity: 1,
      weddingId: wedding.id,
      giftId: giftsList[0]!.id,
    });

    expect(message).toEqual('Gift contribution registered successfully.');
  });

  it('should not be able to complete request if the gifted quantity is bigger than the available gift quantity', async () => {
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

    await expect(
      sut.execute({
        userId: user.id,
        giftedQuantity: 40,
        weddingId: wedding.id,
        giftId: giftsList[0]!.id,
      }),
    ).rejects.toThrow('Requested quantity exceeds available gift quantity.');
  });

  it('should not be able to complete request if the requesting user is not a guest or the owner of the wedding', async () => {
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

    await expect(
      sut.execute({
        userId: user2.id,
        giftedQuantity: 1,
        weddingId: wedding.id,
        giftId: giftsList[0]!.id,
      }),
    ).rejects.toThrow('User does not have permission to perform this action.');
  });

  it('should return user not found', async () => {
    await expect(
      sut.execute({
        userId: 'id',
        giftedQuantity: 1,
        weddingId: 1,
        giftId: 1,
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
        giftedQuantity: 1,
        weddingId: 1,
        giftId: 1,
      }),
    ).rejects.toThrow('Wedding not found.');
  });

  it('should return 404 if gift does not exist', async () => {
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
    await expect(
      sut.execute({
        userId: user.id,
        giftedQuantity: 1,
        weddingId: wedding.id,
        giftId: 1,
      }),
    ).rejects.toThrow('Gift not found.');
  });
});
