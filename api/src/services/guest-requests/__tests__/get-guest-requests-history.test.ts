import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGuestRequestsRepository } from '@/repositories/in-memory/in-memory-guest-requests-repository';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { GetGuestRequestsHistoryService } from '../get-guest-requests-history';
import { beforeEach, describe, expect, it } from 'vitest';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { hash } from 'bcryptjs';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let guestRequestsRepository: InMemoryGuestRequestsRepository;
let sut: GetGuestRequestsHistoryService;

describe('GetGuestRequestsHistoryService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    guestRequestsRepository = new InMemoryGuestRequestsRepository(
      authRepository,
      weddingsRepository,
    );
    sut = new GetGuestRequestsHistoryService(authRepository, guestRequestsRepository);
  });

  it('should successfully get the guest requests history', async () => {
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

    await guestRequestsRepository.createRequest({ userId: user2.id, weddingId: wedding.id });

    const { requests } = await sut.execute({ userId: user1.id });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.user.email).toEqual(user2.email);
  });

  it('should throw 404 when user does not exist', async () => {
    await expect(sut.execute({ userId: 'id' })).rejects.toThrow('User not found.');
  });
});
