import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const baseSchema = {
  NODE_ENV: z.enum(['development', 'production', 'test']),
  SECRET_KEY: z.string(),
};

const envSchema = z.object({
  ...baseSchema,
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  NODEMAILER_EMAIL: z.email(),
  NODEMAILER_APP_PASSWORD: z.string(),
  FRONTEND_URL: z.string(),
});

const testSchema = z.object({
  ...baseSchema,
});

const isTest = process.env.NODE_ENV === 'test';

export const env = isTest ? testSchema.parse(process.env) : envSchema.parse(process.env);
