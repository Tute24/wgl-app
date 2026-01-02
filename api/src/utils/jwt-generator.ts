import { env } from '@/env/index.js';
import { sign } from 'jsonwebtoken';

export function generateJwt(id: string) {
  const token = sign({ payload: id }, env.SECRET_KEY, {
    expiresIn: '1h',
  });

  return token;
}
