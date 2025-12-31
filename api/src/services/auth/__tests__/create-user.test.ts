import { InMemoryRepository } from '@/repositories/in-memory/in-memory-auth-repository.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserService } from '../create-user.js';
import { compare } from 'bcryptjs';
import { userMock } from '@/services/__mocks__/user-mock.js';

let authRepository: InMemoryRepository;
let sut: CreateUserService; //sut comes from suite under test, which is the service being tested

describe('SignInService', () => {
  beforeEach(() => {
    authRepository = new InMemoryRepository();
    sut = new CreateUserService(authRepository);
  });
  it('should create a user successfully', async () => {
    const response = await sut.execute({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: userMock.password,
    });

    expect(response.token).toEqual(expect.any(String));
    expect(response.user.id).toEqual(expect.any(String));
    expect(response.user.email).toEqual(userMock.email);
  });

  it('should not create a user with an existent e-mail', async () => {
    await sut.execute({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: userMock.password,
    });

    await expect(
      sut.execute({
        email: userMock.email,
        firstName: 'Jane',
        lastName: 'Doe',
        password: userMock.password,
      }),
    ).rejects.toThrow('An user with the submitted email already exists.');
  });

  it('should correctly store the hashed password', async () => {
    const user = await sut.execute({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: userMock.password,
    });

    const userRecord = await authRepository.findByEmail(user.user.email);

    expect(userRecord).not.toBeNull();

    const isPasswordCorrectlyHashed = await compare(userMock.password, userRecord!.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
