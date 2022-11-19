import dotenv from 'dotenv';

dotenv.config();

export const EnvConfig = {
  PORT: process.env.PORT,
  DB_URL:
    process.env.NODE_ENV === 'development'
      ? process.env.DB_URL_DEV
      : process.env.DB_URL_PROD,
  SECRET_KEY: process.env.SECRET_KEY,
};
