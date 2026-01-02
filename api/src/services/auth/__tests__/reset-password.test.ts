import { InMemoryRepository } from '@/repositories/in-memory/in-memory-auth-repository.js';
import { ResetPasswordService } from '../reset-password.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { userMock } from '../__mocks__/user-mock.js';
import { hash } from 'bcryptjs';
import crypto from 'node:crypto';

let authRepository: InMemoryRepository;
let sut: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    authRepository = new InMemoryRepository();
    sut = new ResetPasswordService(authRepository);
  });
  it('should succesfully reset the password', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await authRepository.createPasswordResetToken({
      userId: user.id,
      token: encryptedToken,
      expirationDate: BigInt(Date.now() + 10 * 60 * 1000),
    });

    const response = await sut.execute({
      password: 'NewPassword12345!',
      passwordResetToken: resetToken,
    });

    expect(response.message).toEqual('Password reset successfully. Log in with your new password.');
  });

  it('should return invalid credentials if the password reset token is wrong', async () => {
    await expect(
      sut.execute({
        password: 'NewPassword12345!',
        passwordResetToken: 'token',
      }),
    ).rejects.toThrow('Invalid credentials.');
  });

  it('should return error if the token has expired', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await authRepository.createPasswordResetToken({
      userId: user.id,
      token: encryptedToken,
      expirationDate: BigInt(Date.now() - 10 * 60 * 1000),
    });

    await expect(
      sut.execute({
        password: 'NewPassword12345!',
        passwordResetToken: resetToken,
      }),
    ).rejects.toThrow('Token has expired, make a new request');
  });

  it('should return error if the token has already been used', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await authRepository.createPasswordResetToken({
      userId: user.id,
      token: encryptedToken,
      expirationDate: BigInt(Date.now() + 10 * 60 * 1000),
    });

    await sut.execute({
      password: 'NewPassword12345!',
      passwordResetToken: resetToken,
    });

    await expect(
      sut.execute({
        password: 'NewPassword12345!',
        passwordResetToken: resetToken,
      }),
    ).rejects.toThrow('Token has already been used');
  });
});
