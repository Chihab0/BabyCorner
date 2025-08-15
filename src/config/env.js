import dotenv from 'dotenv';
dotenv.config();

export const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  UPLOAD_PATH,
  PORT
} = process.env;
