import dotenv from 'dotenv';

dotenv.config();

export const EnvConfig = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
};
