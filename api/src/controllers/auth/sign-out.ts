import { type Response, type Request } from 'express';
import { errorHandler } from '@/utils/error-handler.js';

export function signOutController(_req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'User signed out successfully.' });
  } catch (error) {
    errorHandler(error, res);
  }
}
