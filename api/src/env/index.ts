import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const baseSchema = {
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
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
  DATABASE_URL: z.string().optional().default(''),
  DIRECT_URL: z.string().optional().default(''),
  PORT: z.coerce.number().default(3333),
  NODEMAILER_EMAIL: z.string().optional().default(''),
  NODEMAILER_APP_PASSWORD: z.string().optional().default(''),
  FRONTEND_URL: z.string().optional().default(''),
});

const isTest = process.env.NODE_ENV === 'test';

export const env = isTest ? testSchema.parse(process.env) : envSchema.parse(process.env);
