import type { SignInDto } from '@/dtos/auth/sign-in';
import type { AuthRepository } from '@/repositories/auth-repository';
import type { SignInAndCreateResponse } from '@/types/auth/sign-in-and-create-response';
import { AppError } from '@/utils/app-error';
import { generateJwt } from '@/utils/jwt-generator';
import { compare } from 'bcryptjs';

export class SignInService {
  constructor(private authRepository: AuthRepository) {}

  async execute({ email, password }: SignInDto): Promise<SignInAndCreateResponse> {
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
