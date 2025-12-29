import prisma from '@/lib/prisma.js';
import type { Prisma } from '@prisma/client';
import type { AuthRepository } from '../auth-repository.js';

export class PrismaAuthRepository implements AuthRepository {
  async createUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async createPasswordResetToken(data: Prisma.PasswordResetTokenCreateInput) {
    await prisma.passwordResetToken.create({
      data,
    });
  }
}
