import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository.js';
import { CreateUserService } from '@/services/auth/create-user.js';
import { errorHandler } from '@/utils/error-handler.js';
import createUserSchema from '@/zod-schemas/auth/create-user.js';
import { type Request, type Response } from 'express';

export async function createUserController(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = createUserSchema.parse(req.body);

    const authRepository = new PrismaAuthRepository();
    const createUserService = new CreateUserService(authRepository);

    const { token, user } = await createUserService.execute({
      firstName,
      lastName,
      email,
      password,
    });
    res.send(201).json({ token, user });
  } catch (error) {
    errorHandler(error, res);
  }
}
