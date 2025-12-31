import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  PORT: z.number().default(3333),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  SECRET_KEY: z.string(),
  NODEMAILER_EMAIL: z.email(),
  NODEMAILER_APP_PASSWORD: z.string(),
  FRONTEND_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid enviroment variables', _env.error.message);

  throw new Error('Invalid enviroment variables');
}

export const env = _env.data;
