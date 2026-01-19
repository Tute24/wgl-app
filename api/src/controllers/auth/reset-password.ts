import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { ResetPasswordService } from '@/services/auth/reset-password';
import { resetPasswordSchema } from '@/zod-schemas/auth/reset-password';
import { type Request, type Response } from 'express';

export async function resetPasswordController(req: Request, res: Response) {
  const { password } = resetPasswordSchema.parse(req.body);
  const passwordResetToken = req.headers.authorization?.split(' ')[1];

  const authRepository = new PrismaAuthRepository();
  const resetPasswordService = new ResetPasswordService(authRepository);

  const { message } = await resetPasswordService.execute({
    passwordResetToken: passwordResetToken ? passwordResetToken : '',
    password,
  });

  res.status(200).json({ message });
}
