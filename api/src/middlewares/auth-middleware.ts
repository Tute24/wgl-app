import { env } from '@/env/index.js';
import type { TokenPayload } from '@/types/auth/token-payload.js';
import { AppError } from '@/utils/app-error.js';
import { type Response, type Request, type NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export default function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new AppError('Invalid credentials.', 401);

  const decodedToken = verify(token, env.SECRET_KEY) as TokenPayload;
  if (!decodedToken) throw new AppError('Invalid credentials.', 401);

  req.authUser = decodedToken;
  next();
}
