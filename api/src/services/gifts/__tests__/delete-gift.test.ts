import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGiftsRepository } from '@/repositories/in-memory/in-memory-gifts-repository';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { DeleteGiftService } from '../delete-gift';
import { beforeEach, describe, expect, it } from 'vitest';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { hash } from 'bcryptjs';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { giftsMock } from '../__mocks__/gifts-mock';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let giftsRepository: InMemoryGiftsRepository;
let sut: DeleteGiftService;

describe('DeleteGiftService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    giftsRepository = new InMemoryGiftsRepository();
    sut = new DeleteGiftService(authRepository, weddingsRepository, giftsRepository);
  });

  it('should delete a gift successfully', async () => {
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

    const { message } = await sut.execute({ userId: user.id, giftId: giftsList[0]!.id });

    expect(message).toEqual('Gift deleted successfully.');
  });

  it('should not be able to delete gift when requesting user is not the owner of the wedding', async () => {
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

    await expect(sut.execute({ userId: user2.id, giftId: giftsList[0]!.id })).rejects.toThrow(
      'User does not have permission to perform this action.',
    );
  });

  it('should return 404 if user does not exist', async () => {
    await expect(sut.execute({ userId: 'id', giftId: 1 })).rejects.toThrow('User not found.');
  });

  it('should return 404 if gift does not exist', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    await weddingsRepository.createWedding({
      createdBy: user.id,
      weddingTitle: weddingMock.weddingTitle,
      weddingDate: weddingMock.weddingDate,
      shippingAddress: weddingMock.shippingAddress,
    });
    await expect(sut.execute({ userId: user.id, giftId: 1 })).rejects.toThrow('Gift not found.');
  });
});
