import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGuestRequestsRepository } from '@/repositories/in-memory/in-memory-guest-requests-repository';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { AcceptGuestRequestService } from '../accept-guest-request';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { hash } from 'bcryptjs';

let authRepository: InMemoryAuthRepository;
let guestsRepository: InMemoryGuestsRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestRequestsRepository: InMemoryGuestRequestsRepository;
let sut: AcceptGuestRequestService;

describe('AcceptGuestRequestService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    guestRequestsRepository = new InMemoryGuestRequestsRepository(
      authRepository,
      weddingsRepository,
    );
    sut = new AcceptGuestRequestService(authRepository, guestsRepository, guestRequestsRepository);
  });

  it('should accept a guest request successfully', async () => {
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
    const requests = await guestRequestsRepository.getGuestRequestsHistory(user1.id);
    const { message } = await sut.execute({ guestRequestId: requests[0]!.id, userId: user1.id });

    expect(message).toEqual('Requested successfully accepted.');
  });

  it('should return an error if trying to review a request that was already reviewed', async () => {
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
    const requests = await guestRequestsRepository.getGuestRequestsHistory(user1.id);
    await guestRequestsRepository.acceptGuestRequest(requests[0]!.id);

    await expect(
      sut.execute({ guestRequestId: requests[0]!.id, userId: user1.id }),
    ).rejects.toThrow('This request has already been reviewed.');
  });

  it('should not be able to accept the guest request if the user is not the wedding owner', async () => {
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
    const requests = await guestRequestsRepository.getGuestRequestsHistory(user1.id);

    await expect(
      sut.execute({ guestRequestId: requests[0]!.id, userId: user2.id }),
    ).rejects.toThrow('User does not have permission to perform this action.');
  });

  it('should throw 404 when user does not exist', async () => {
    await expect(sut.execute({ userId: 'id', guestRequestId: 1 })).rejects.toThrow(
      'User not found.',
    );
  });

  it('should throw 404 when guest request does not exist', async () => {
    const user1 = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });
    await expect(sut.execute({ userId: user1.id, guestRequestId: 1 })).rejects.toThrow(
      'Guest Request not found.',
    );
  });
});
