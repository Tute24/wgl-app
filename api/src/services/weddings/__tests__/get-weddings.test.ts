import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository.js';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository.js';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetWeddingsService } from '../get-weddings.js';
import { userMock } from '@/services/auth/__mocks__/user-mock.js';
import { hash } from 'bcryptjs';
import { weddingMock } from '../__mocks__/wedding-mock.js';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let sut: GetWeddingsService;

describe('GetWeddingsService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    sut = new GetWeddingsService(authRepository, weddingsRepository);
  });

  it('should return the own weddings correctly', async () => {
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

    const response = await sut.execute({ userId: user.id });

    expect(response.invitedWeddings).toHaveLength(0);
    expect(response.ownWeddings).toHaveLength(1);
    expect(response.ownWeddings[0]?.weddingTitle).toEqual(weddingMock.weddingTitle);
  });

  it('should return the invited weddings correctly', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    await weddingsRepository.createWedding({
      createdBy: 'user-2-id',
      weddingTitle: weddingMock.weddingTitle,
      weddingDate: weddingMock.weddingDate,
      shippingAddress: weddingMock.shippingAddress,
    });

    await guestsRepository.addGuest(user.id, 1);

    const response = await sut.execute({ userId: user.id });

    expect(response.invitedWeddings).toHaveLength(1);
    expect(response.ownWeddings).toHaveLength(0);
    expect(response.invitedWeddings[0]?.weddingTitle).toEqual(weddingMock.weddingTitle);
  });

  it('should return user not found if requesting user does not exist', async () => {
    await expect(sut.execute({ userId: 'id' })).rejects.toThrow('User not found.');
  });
});
