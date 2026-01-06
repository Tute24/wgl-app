import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGiftsRepository } from '@/repositories/in-memory/in-memory-gifts-repository';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { GetGiftsService } from '../get-gifts';
import { beforeEach, describe, expect, it } from 'vitest';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { hash } from 'bcryptjs';
import { giftsMock } from '../__mocks__/gifts-mock';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let giftsRepository: InMemoryGiftsRepository;
let sut: GetGiftsService;

describe('GetGiftsService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    giftsRepository = new InMemoryGiftsRepository();
    sut = new GetGiftsService(
      authRepository,
      weddingsRepository,
      guestsRepository,
      giftsRepository,
    );
  });

  it('should fetch the gifts for the wedding owner', async () => {
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

    const { gifts, weddingRole } = await sut.execute({ userId: user.id, weddingId: wedding.id });

    expect(gifts).toHaveLength(2);
    expect(weddingRole).toEqual('OWNER');
  });

  it('should fetch the gifts for the wedding guest', async () => {
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

    await guestsRepository.addGuest(user2.id, wedding.id);

    const treatedGifts = giftsMock.gifts.map((gift) => ({ ...gift, fromWedding: wedding.id }));

    await giftsRepository.createGifts(treatedGifts);

    const { gifts, weddingRole } = await sut.execute({ userId: user2.id, weddingId: wedding.id });

    expect(gifts).toHaveLength(2);
    expect(weddingRole).toEqual('GUEST');
  });

  it('should return empty array if user is not owner nor guest of the wedding', async () => {
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

    const { gifts, weddingRole } = await sut.execute({ userId: user2.id, weddingId: wedding.id });

    expect(gifts).toHaveLength(0);
    expect(weddingRole).toEqual('NONE');
  });

  it('should return user not found', async () => {
    await expect(sut.execute({ userId: 'user-id', weddingId: 1 })).rejects.toThrow(
      'User not found.',
    );
  });

  it('should return wedding not found', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    await expect(sut.execute({ userId: user.id, weddingId: 1 })).rejects.toThrow(
      'Wedding not found.',
    );
  });
});
