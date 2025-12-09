import dotenv from 'dotenv';
dotenv.config();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  APP_PASSWORD: process.env.APP_PASSWORD as string,
  SECRET_KEY: process.env.SECRET_KEY as string,
  SENDER_EMAIL: process.env.SENDER_EMAIL as string,
};
