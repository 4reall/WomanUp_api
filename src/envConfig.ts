import dotenv from 'dotenv';

dotenv.config();

const validateRequiredEnv = (envName: string) => {
  const envVar = process.env[envName];
  if (!envVar) {
    throw new Error(`Required environment variable ${envName} not provided`);
  }
  return envVar;
};

export const EnvConfig = {
  PORT: process.env.PORT || 5000,
  DB_URL: validateRequiredEnv('DB_URL'),
  SECRET_KEY: validateRequiredEnv('SECRET_KEY'),
};
