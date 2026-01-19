import { type Response, type Request } from 'express';

export async function signOutController(_req: Request, res: Response) {
  res.status(200).json({ message: 'User signed out successfully.' });
}
