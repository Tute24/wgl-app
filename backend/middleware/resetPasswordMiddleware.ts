import { NextFunction, Response, Request } from 'express';
import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import * as jwt from 'jsonwebtoken';
import { env } from '../env';

interface resetPasswordTokenBody {
  id: string;
  resetToken: string;
}

export interface ResetPasswordRequest extends Request {
  authData?: resetPasswordTokenBody;
}

export default async function resetPasswordAuth(
  req: ResetPasswordRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const resetToken = req.headers.authorization?.split(' ')[1];

  if (!resetToken) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decodedResetToken = jwt.verify(resetToken, env.SECRET_KEY) as resetPasswordTokenBody;
    const encryptedToken = crypto
      .createHash('sha256')
      .update(decodedResetToken.resetToken)
      .digest('hex');
    const storedToken = await prisma.passwordResetTokenStorage.findUnique({
      where: {
        token: encryptedToken,
      },
    });
    if (!storedToken) {
      res.status(404).json({
        message: 'Token not present in the database.',
      });
      return;
    }
    if (storedToken.requestedBy !== decodedResetToken.id) {
      res.status(403).json({
        message: 'The requesting user does not correspond to the account owner.',
      });
      return;
    }
    if (storedToken.used === true) {
      res.status(409).json({
        message: 'This link has already been used.',
      });
      return;
    }

    req.authData = decodedResetToken;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Token expired.' });
    } else {
      res.status(500).json({ message: 'Server error.' });
    }
  }
}
