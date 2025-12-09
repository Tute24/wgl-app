import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { env } from '../env';

interface tokenBody {
  id: string;
}

export interface CustomRequest extends Request {
  authUser?: tokenBody;
}

export default function isAuthenticated(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, env.SECRET_KEY) as tokenBody;

    if (!decodedToken.id) {
      res.status(401).json({ message: 'User not authenticated.' });
      return;
    }

    req.authUser = decodedToken;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
}
