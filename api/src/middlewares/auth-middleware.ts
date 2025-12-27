import { env } from '@/env/index.js';
import { AppError } from '@/utils/app-error.js';
import { type Response, type Request, type NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
}

export interface CustomRequest extends Request {
  authUser: TokenPayload;
}

export default function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new AppError('Invalid credentials.', 401);

  const decodedToken = verify(token, env.SECRET_KEY) as TokenPayload;
  if (!decodedToken) throw new AppError('Invalid credentials.', 401);

  req.authUser = decodedToken;
  next();
}
