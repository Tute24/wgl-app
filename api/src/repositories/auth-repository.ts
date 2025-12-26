import type { Prisma, User } from '@prisma/client';

export interface AuthRepository {
  create(_data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(_email: string): Promise<User | null>;
}
