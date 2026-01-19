import prisma from '@/lib/prisma';
import type { AuthRepository } from '../auth-repository';
import type { CreateUserDto } from '@/dtos/auth/create-user';
import type { CreatePasswordResetTokenDto } from '@/dtos/auth/create-password-reset-token';

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

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

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
