import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { ForgotPasswordService } from '@/services/auth/forgot-password';
import { errorHandler } from '@/utils/error-handler';
import { type Request, type Response } from 'express';
import z from 'zod';

export async function forgotPasswordController(req: Request, res: Response) {
  const forgotPasswordSchema = z.object({
    email: z.email({ message: 'Not a valid e-mail address.' }),
  });
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    const authRepository = new PrismaAuthRepository();
    const forgotPasswordService = new ForgotPasswordService(authRepository);
    const { message } = await forgotPasswordService.execute({ email });
    res.status(201).json({ message });
  } catch (error) {
    errorHandler(error, res);
  }
}
