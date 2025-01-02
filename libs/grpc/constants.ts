import * as dotenv from 'dotenv';
dotenv.config();

export const { GRPC_HOST } = process.env;

export const GRPC_API_PORT = 5000;
export const GRPC_USER_PORT = 5001;
export const GRPC_MARKET_PORT = 5002;
export const GRPC_PORTFOLIO_PORT = 5003;
