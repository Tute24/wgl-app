import { env } from '@/env/index.js';
import type { AuthRepository } from '@/repositories/auth-repository.js';
import { transporter } from '@/utils/nodemailer-transporter.js';
import crypto from 'node:crypto';

export interface ForgotPasswordRequestProps {
  email: string;
}

export class ForgotPasswordService {
  constructor(private authRepository: AuthRepository) {}

  async execute({ email }: ForgotPasswordRequestProps): Promise<{ message: string }> {
    const requestingUser = await this.authRepository.findByEmail(email);

    const resetToken = crypto.randomBytes(32).toString('hex');
    const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    if (requestingUser) {
      await this.authRepository.createPasswordResetToken({
        user: { connect: { id: requestingUser.id } },
        token: encryptedToken,
        expirationDate: Date.now() + 10 * 60 * 1000, // 10min
      });

      const passwordResetTokenEmailLink = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      const resetPasswordEmailStructure = {
        from: env.NODEMAILER_EMAIL,
        to: requestingUser.email,
        subject: 'Here is the next step to resetting your password:',
        html: `<h2>Click in the following link to retrieve your password:</h2>
                 <a href="${passwordResetTokenEmailLink}">Reset Password</a>`,
      };

      await transporter.sendMail(resetPasswordEmailStructure);
    }

    const message = 'If this e-mail exists on our database, a link to reset the password was sent.';
    return { message };
  }
}
