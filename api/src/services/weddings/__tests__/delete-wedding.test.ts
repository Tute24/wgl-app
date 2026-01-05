import { InMemoryAuthRepository } from '@/repositories/in-memory/in-memory-auth-repository.js';
import { InMemoryWeddingsRepository } from '@/repositories/in-memory/in-memory-weddings-repository.js';
import { DeleteWeddingService } from '../delete-wedding.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGuestsRepository } from '@/repositories/in-memory/in-memory-guests-repository.js';
import { userMock } from '@/services/auth/__mocks__/user-mock.js';
import { hash } from 'bcryptjs';
import { weddingMock } from '../__mocks__/wedding-mock.js';

let authRepository: InMemoryAuthRepository;
let weddingsRepository: InMemoryWeddingsRepository;
let guestsRepository: InMemoryGuestsRepository;
let sut: DeleteWeddingService;

describe('DeleteWeddingService', () => {
  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    guestsRepository = new InMemoryGuestsRepository();
    weddingsRepository = new InMemoryWeddingsRepository(guestsRepository);
    sut = new DeleteWeddingService(authRepository, weddingsRepository);
  });

  it('should successfully delete a wedding', async () => {
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

    const { message } = await sut.execute({ userId: user.id, weddingId: wedding.id });

    expect(message).toEqual('Wedding successfully deleted.');
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

  it('should throw 403 if user is not the wedding creator', async () => {
    const user1 = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const user2 = await authRepository.createUser({
      email: 'email2@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: await hash('Teste54321!', 6),
    });

    const wedding = await weddingsRepository.createWedding({
      createdBy: user1.id,
      weddingTitle: weddingMock.weddingTitle,
      weddingDate: weddingMock.weddingDate,
      shippingAddress: weddingMock.shippingAddress,
    });

    await expect(sut.execute({ userId: user2.id, weddingId: wedding.id })).rejects.toThrow(
      'User does not have permission to perform this action.',
    );
  });
});
