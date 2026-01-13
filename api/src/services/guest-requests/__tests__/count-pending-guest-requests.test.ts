import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGuestRequestsRepository } from '@/repositories/in-memory/in-memory-guest-requests-repository';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { CountPendingGuestRequestsService } from '../count-pending-guest-requests';
import { beforeEach, describe, expect, it } from 'vitest';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { hash } from 'bcryptjs';

let authRepository: InMemoryAuthRepository;
let guestsRepository: InMemoryGuestsRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestRequestsRepository: InMemoryGuestRequestsRepository;
let sut: CountPendingGuestRequestsService;

describe('CountPendingGuestRequestsService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    guestRequestsRepository = new InMemoryGuestRequestsRepository(
      authRepository,
      weddingsRepository,
    );
    sut = new CountPendingGuestRequestsService(authRepository, guestRequestsRepository);
  });

  it('should succesfully return the number of pen ding request on own weddings', async () => {
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
    const pendingRequestsBefore = await sut.execute({ userId: user1.id });
    expect(pendingRequestsBefore.pendingGuestRequests).toEqual(0);

    await guestRequestsRepository.createRequest({ userId: user2.id, weddingId: wedding.id });

    const pendingRequestsAfter = await sut.execute({ userId: user1.id });
    expect(pendingRequestsAfter.pendingGuestRequests).toEqual(1);
  });

  it('should throw 404 when user does not exist', async () => {
    await expect(sut.execute({ userId: 'id' })).rejects.toThrow('User not found.');
  });
});
