import type { UsersRepository } from '../users-repository.js';
import prisma from '@/lib/prisma.js';

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
