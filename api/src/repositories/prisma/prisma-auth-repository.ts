import prisma from '@/lib/prisma.js';
import type { AuthRepository } from '../auth-repository.js';
import type { CreateUserDto } from '@/dtos/auth/create-user.js';
import type { CreatePasswordResetTokenDto } from '@/dtos/auth/create-password-reset-token.js';

export class PrismaAuthRepository implements AuthRepository {
  async createUser(data: CreateUserDto) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async createPasswordResetToken(data: CreatePasswordResetTokenDto) {
    await prisma.passwordResetToken.create({
      data: {
        user: {
          connect: { id: data.userId },
        },
        token: data.token,
        expirationDate: data.expirationDate,
      },
    });
  }

  async findPasswordResetToken(passwordResetToken: string) {
    const passwordResetTokenRecord = await prisma.passwordResetToken.findUnique({
      where: {
        token: passwordResetToken,
      },
    });

    return passwordResetTokenRecord;
  }

  async resetPassword(userID: string, password: string) {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        password,
      },
    });
  }

  async markTokenAsUsed(passwordResetToken: string) {
    await prisma.passwordResetToken.update({
      where: {
        token: passwordResetToken,
      },
      data: {
        used: true,
      },
    });
  }
}
