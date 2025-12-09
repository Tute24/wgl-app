import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { env } from '../env';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.SENDER_EMAIL,
    pass: env.APP_PASSWORD,
  },
});
