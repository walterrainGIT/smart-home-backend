import * as dotenv from 'dotenv';
dotenv.config();

export const { JWT_SECRET_KEY, JWT_TTL } = process.env;
