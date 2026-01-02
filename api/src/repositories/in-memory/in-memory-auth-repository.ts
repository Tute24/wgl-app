import type { PasswordResetToken, User } from '@prisma/client';
import type { AuthRepository } from '../auth-repository.js';
import type { CreateUserDto } from '@/dtos/auth/create-user.js';
import type { CreatePasswordResetTokenDto } from '@/dtos/auth/create-password-reset-token.js';

export class InMemoryAuthRepository implements AuthRepository {
  public userDb: User[] = [];
  public passwordResetTokenDb: PasswordResetToken[] = [];

  async createUser(data: CreateUserDto) {
    const user = {
      id: 'user-1-id',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      createdAt: new Date(),
    };

    this.userDb.push(user);

    return user;
  }

  async findPasswordResetToken(passwordResetToken: string) {
    const passwordResetTokenRecord = this.passwordResetTokenDb.find(
      (record) => record.token === passwordResetToken,
    );

    if (!passwordResetTokenRecord) return null;

    return passwordResetTokenRecord;
  }
  async resetPassword(userID: string, password: string) {
    this.userDb.map((record) => (record.id === userID ? (record.password = password) : record));
  }
  async markTokenAsUsed(passwordResetToken: string) {
    this.passwordResetTokenDb.map((record) =>
      record.token === passwordResetToken ? (record.used = true) : record,
    );
  }
  async createPasswordResetToken(data: CreatePasswordResetTokenDto) {
    const passwordResetToken = {
      id: this.passwordResetTokenDb.length + 1,
      token: data.token,
      expirationDate: data.expirationDate,
      requestedBy: data.userId,
      used: false,
    };

    this.passwordResetTokenDb.push(passwordResetToken);
  }
  async findByEmail(email: string) {
    const user = this.userDb.find((record) => record.email === email);

    if (!user) return null;

    return user;
  }
}
