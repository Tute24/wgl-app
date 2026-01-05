import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { SignInService } from '@/services/auth/sign-in';
import { errorHandler } from '@/utils/error-handler';
import { signInBodySchema } from '@/zod-schemas/auth/sign-in';
import { type Request, type Response } from 'express';

export async function signInController(req: Request, res: Response) {
  try {
    const { email, password } = signInBodySchema.parse(req.body);
    const authRepository = new PrismaAuthRepository();
    const signInService = new SignInService(authRepository);

    const { token, user } = await signInService.execute({ email, password });
    res.status(200).json({ token, user });
  } catch (error) {
    errorHandler(error, res);
  }
}
