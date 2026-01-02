import { InMemoryRepository } from '@/repositories/in-memory/in-memory-auth-repository.js';
import { describe, expect, beforeEach, it } from 'vitest';
import { SignInService } from '../sign-in.js';
import { userMock } from '@/services/auth/__mocks__/user-mock.js';
import { hash } from 'bcryptjs';

let authRepository: InMemoryRepository;
let sut: SignInService;
describe('SignInService', () => {
  beforeEach(() => {
    authRepository = new InMemoryRepository();
    sut = new SignInService(authRepository);
  });

  it('should sign in an user sucessfully', async () => {
    await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const response = await sut.execute({ email: userMock.email, password: userMock.password });

    expect(response.token).toEqual(expect.any(String));
    expect(response.user.id).toEqual(expect.any(String));
    expect(response.user.email).toEqual(userMock.email);
  });

  it('should not sign in on non-existant e-mail', async () => {
    await expect(
      sut.execute({ email: userMock.email, password: userMock.password }),
    ).rejects.toThrow('Invalid credentials.');
  });

  it('should not sign in on incorrect password', async () => {
    await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    await expect(sut.execute({ email: userMock.email, password: 'Test' })).rejects.toThrow(
      'Invalid credentials.',
    );
  });
});
