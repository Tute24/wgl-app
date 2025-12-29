import type { Prisma, User } from '@prisma/client';

export interface AuthRepository {
  createUser(_data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(_email: string): Promise<User | null>;
  createPasswordResetToken(data: Prisma.PasswordResetTokenCreateInput): Promise<void>;
}
