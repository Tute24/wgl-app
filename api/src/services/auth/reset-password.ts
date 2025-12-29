import type { AuthRepository } from '@/repositories/auth-repository.js';
import { AppError } from '@/utils/app-error.js';
import { hash } from 'bcryptjs';
import crypto from 'node:crypto';

export interface ResetPasswordRequestProps {
  passwordResetToken: string;
  password: string;
}

export class ResetPasswordService {
  constructor(private authRepository: AuthRepository) {}

  async execute({ passwordResetToken, password }: ResetPasswordRequestProps) {
    const encryptedToken = crypto.createHash('sha256').update(passwordResetToken).digest('hex');
    const passwordResetTokenRecord =
      await this.authRepository.findPasswordResetToken(encryptedToken);

    if (!passwordResetTokenRecord) throw new AppError('Invalid credentials.', 401);
    if (passwordResetTokenRecord.expirationDate < Date.now())
      throw new AppError('Token has expired, make a new request', 401);
    if (passwordResetTokenRecord.used) throw new AppError('Token has already been used.', 409);

    const passwordHash = await hash(password, 6);

    await this.authRepository.resetPassword(passwordResetTokenRecord.requestedBy, passwordHash);

    await this.authRepository.markTokenAsUsed(encryptedToken);

    const message = 'Password reset successfully. Log in with your new password.';

    return { message };
  }
}
