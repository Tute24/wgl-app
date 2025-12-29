import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository.js';
import { ResetPasswordService } from '@/services/auth/reset-password.js';
import { errorHandler } from '@/utils/error-handler.js';
import { resetPasswordSchema } from '@/zod-schemas/auth/reset-password.js';
import { type Request, type Response } from 'express';

export async function resetPasswordController(req: Request, res: Response) {
  try {
    const { passwordResetToken, password } = resetPasswordSchema.parse(req.body);

    const authRepository = new PrismaAuthRepository();
    const resetPasswordService = new ResetPasswordService(authRepository);

    const { message } = await resetPasswordService.execute({ passwordResetToken, password });

    res.status(200).json({ message });
  } catch (error) {
    errorHandler(error, res);
  }
}
