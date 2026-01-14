import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { CreateUserService } from '@/services/auth/create-user';
import createUserSchema from '@/zod-schemas/auth/create-user';
import { type Request, type Response } from 'express';

export async function createUserController(req: Request, res: Response) {
  const { firstName, lastName, email, password } = createUserSchema.parse(req.body);

  const authRepository = new PrismaAuthRepository();
  const createUserService = new CreateUserService(authRepository);

  const { token, user } = await createUserService.execute({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(201).json({ token, user });
}
