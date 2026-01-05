import type { CreatePasswordResetTokenDto } from '@/dtos/auth/create-password-reset-token';
import type { CreateUserDto } from '@/dtos/auth/create-user';
import type { PasswordResetToken, User } from '@prisma/client';

export interface AuthRepository {
  createUser(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  createPasswordResetToken(data: CreatePasswordResetTokenDto): Promise<void>;
  findPasswordResetToken(passwordResetToken: string): Promise<PasswordResetToken | null>;
  resetPassword(userID: string, password: string): Promise<void>;
  markTokenAsUsed(passwordResetToken: string): Promise<void>;
  findById(id: string): Promise<User | null>;
}
