import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository';
import { InMemoryGuestRequestsRepository } from '@/repositories/in-memory/in-memory-guest-requests-repository';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository';
import { CreateGuestRequestService } from '../create-guest-request';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository';
import { userMock } from '@/services/auth/__mocks__/user-mock';
import { weddingMock } from '@/services/weddings/__mocks__/wedding-mock';
import { hash } from 'bcryptjs';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let guestRequestsRepository: InMemoryGuestRequestsRepository;
let sut: CreateGuestRequestService;

describe('CreateGuestRequestService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    guestRequestsRepository = new InMemoryGuestRequestsRepository(
      authRepository,
      weddingsRepository,
    );
    sut = new CreateGuestRequestService(
      authRepository,
      weddingsRepository,
      guestRequestsRepository,
    );
  });

  it('should successfully create a guest request', async () => {
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

    const { message } = await sut.execute({ userId: user2.id, weddingId: wedding.id });

    expect(message).toEqual('Request created successfully.');
  });

  it('should not be able to create a guest request if the requesting user has already a pending request on the wedding', async () => {
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

    await sut.execute({ userId: user2.id, weddingId: wedding.id });

    await expect(sut.execute({ userId: user2.id, weddingId: wedding.id })).rejects.toThrow(
      'User currently has a pending guest request for this wedding',
    );
  });

  it('should not be able to create a guest request if the using is the wedding owner', async () => {
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

    await expect(sut.execute({ userId: user.id, weddingId: wedding.id })).rejects.toThrow(
      'User is the wedding owner.',
    );
  });

  it('should throw 404 when user does not exist', async () => {
    await expect(sut.execute({ userId: 'id', weddingId: 1 })).rejects.toThrow('User not found.');
  });

  it('should throw 404 when wedding does not exist', async () => {
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
