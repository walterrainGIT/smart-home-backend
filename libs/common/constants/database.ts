import * as dotenv from 'dotenv';
dotenv.config();

export const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
  process.env;
