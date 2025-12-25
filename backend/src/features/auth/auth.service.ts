/* eslint-disable @typescript-eslint/no-var-requires */
import { AppError } from '../../classes/app-error';
import crypto from 'crypto';
import { transporter } from '../../transporter/nodemailer-transporter';
import { prisma } from '../../lib/prisma';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { env } from '../../env';

export async function signInService(email: string, password: string) {
  const logInUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!logInUser) {
    throw new AppError("This email doesn't belong to an existent user.", 404);
  }

  if (!(await bcryptjs.compare(password, logInUser.password))) {
    throw new AppError('Incorrect password.', 401);
  }
  const token = jwt.sign({ id: logInUser.id }, env.SECRET_KEY, {
    expiresIn: '3h',
  });
  const username = logInUser.firstName;
  return {
    username,
    token,
  };
}

export async function forgotPasswordService(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("There's no active user with this e-mail address.", 404);
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  await prisma.passwordResetTokenStorage.create({
    data: {
      requestedBy: user.id,
      used: false,
      expirationDate: Date.now() + 10 * 60 * 1000,
      token: encryptedToken,
    },
  });

  const tokenPayload = {
    id: user.id,
    resetToken,
  };
  const jwtResetToken = jwt.sign(tokenPayload, env.SECRET_KEY, {
    expiresIn: '10m',
  });
  const resetLink = `http://localhost:3001/reset-password/${jwtResetToken}`;
  const mailOptions = {
    from: env.SENDER_EMAIL,
    to: user.email,
    subject: 'Here is the next step to resetting your password:',
    html: `<h2>Click in the following link to retrieve your password:</h2>
                 <a href="${resetLink}">Reset Password</a>`,
  };

  await transporter.sendMail(mailOptions);
  const message = 'Recovery e-mail successfully sent.';
  return { message };
}

export async function resetPasswordService(userID: string, resetToken: string, password: string) {
  if (!userID) {
    throw new AppError('Missing User ID', 400);
  }
  if (!resetToken) {
    throw new AppError('Reset Token not present.', 401);
  }

  const newHashedPassword = await bcryptjs.hash(password, 10);

  const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  await prisma.users.update({
    where: {
      id: userID,
    },
    data: {
      password: newHashedPassword,
    },
  });

  await prisma.passwordResetTokenStorage.update({
    where: {
      token: encryptedToken,
    },
    data: {
      used: true,
    },
  });

  const message = 'Password reset successfully.';

  return {
    message,
  };
}
