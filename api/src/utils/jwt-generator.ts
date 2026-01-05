import { env } from '@/env/index.js';
import jwt from 'jsonwebtoken';

export function generateJwt(id: string) {
  const token = jwt.sign({ payload: id }, env.SECRET_KEY, {
    expiresIn: '1h',
  });

  return token;
}
