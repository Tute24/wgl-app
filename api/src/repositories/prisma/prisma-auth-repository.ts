import prisma from '@/lib/prisma.js';
import type { Prisma } from '@prisma/client';
import type { AuthRepository } from '../auth-repository.js';

export class PrismaAuthRepository implements AuthRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }
}
