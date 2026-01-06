import { env } from '@/env/index';
import jwt from 'jsonwebtoken';

export function generateJwt(id: string) {
  const token = jwt.sign({ id: id }, env.SECRET_KEY, {
    expiresIn: '1h',
  });

  return token;
}
