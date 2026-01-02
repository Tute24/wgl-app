import { InMemoryRepository } from '@/repositories/in-memory/in-memory-auth-repository.js';
import { ForgotPasswordService } from '../forgot-password.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userMock } from '../__mocks__/user-mock.js';
import { hash } from 'bcryptjs';
import { transporter } from '@/utils/nodemailer-transporter.js';

let authRepository: InMemoryRepository;
let sut: ForgotPasswordService;

vi.mock('@/utils/nodemailer-transporter.js', () => ({
  transporter: {
    sendMail: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('ForgotPasswordService', () => {
  beforeEach(() => {
    authRepository = new InMemoryRepository();
    sut = new ForgotPasswordService(authRepository);
    vi.clearAllMocks();
  });

  it('should correctly create a password reset token record and send email', async () => {
    const user = await authRepository.createUser({
      email: userMock.email,
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      password: await hash(userMock.password, 6),
    });

    const createPasswordResetTokenSpy = vi.spyOn(authRepository, 'createPasswordResetToken');

    const response = await sut.execute({ email: userMock.email });

    expect(createPasswordResetTokenSpy).toHaveBeenCalledWith({
      userId: user.id,
      token: expect.any(String),
      expirationDate: expect.any(BigInt),
    });
    expect(transporter.sendMail).toHaveBeenCalledOnce();
    expect(response.message).toEqual(
      'If this e-mail exists on our database, a link to reset the password was sent.',
    );
  });

  it('should not create a password reset token if the e-mail is not on the database', async () => {
    const createPasswordResetTokenSpy = vi.spyOn(authRepository, 'createPasswordResetToken');

    const response = await sut.execute({ email: userMock.email });

    expect(createPasswordResetTokenSpy).not.toHaveBeenCalled();
    expect(transporter.sendMail).not.toHaveBeenCalled();
    expect(response.message).toEqual(
      'If this e-mail exists on our database, a link to reset the password was sent.',
    );
  });
});
