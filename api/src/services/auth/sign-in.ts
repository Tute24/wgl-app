import type { AuthRepository } from '@/repositories/auth-repository.js';
import type { SignInAndCreateResponse } from '@/types/auth/sign-in-and-create-response.js';
import { AppError } from '@/utils/app-error.js';
import { generateJwt } from '@/utils/jwt-generator.js';
import { compare } from 'bcryptjs';

export interface SignInRequestProps {
  email: string;
  password: string;
}

export class SignInService {
  constructor(private authRepository: AuthRepository) {}

  async execute({ email, password }: SignInRequestProps): Promise<SignInAndCreateResponse> {
    const user = await this.authRepository.findByEmail(email);
    if (!user || !(await compare(password, user.password)))
      throw new AppError('Invalid credentials.', 401);

    const token = generateJwt(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
