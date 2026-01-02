import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { env } from '@/env/index.js';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.NODEMAILER_EMAIL,
    pass: env.NODEMAILER_APP_PASSWORD,
  },
});
