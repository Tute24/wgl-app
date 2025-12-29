import type { PasswordResetToken, Prisma, User } from '@prisma/client';

export interface AuthRepository {
  createUser(_data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(_email: string): Promise<User | null>;
  createPasswordResetToken(data: Prisma.PasswordResetTokenCreateInput): Promise<void>;
  findPasswordResetToken(passwordResetToken: string): Promise<PasswordResetToken | null>;
  resetPassword(userID: string, password: string): Promise<void>;
  markTokenAsUsed(passwordResetToken: string): Promise<void>;
}
