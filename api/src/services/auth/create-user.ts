import type { CreateUserDto } from '@/dtos/auth/create-user.js';
import type { AuthRepository } from '@/repositories/auth-repository.js';
import type { SignInAndCreateResponse } from '@/types/auth/sign-in-and-create-response.js';
import { AppError } from '@/utils/app-error.js';
import { generateJwt } from '@/utils/jwt-generator.js';
import { hash } from 'bcryptjs';

export class CreateUserService {
  constructor(private authRepository: AuthRepository) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserDto): Promise<SignInAndCreateResponse> {
    const alreadyExistentUser = await this.authRepository.findByEmail(email);

    if (alreadyExistentUser)
      throw new AppError('An user with the submitted email already exists.', 409);

    const passwordHash = await hash(password, 6);

    const user = await this.authRepository.createUser({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

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
