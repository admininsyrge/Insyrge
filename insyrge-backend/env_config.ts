import { config } from 'dotenv';
config();

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
export const NODEMAILER_EMAIL = process.env.NODEMAILER_MAIL as string;
export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;
export const ENVIRONMENT = process.env.ENVIRONMENT as string;
export const LOCAL_PORT = process.env.LOCAL_PORT as string;
export const PROD_PORT = process.env.PROD_PORT as string;
export const LOCAL_DB_URL = process.env.LOCAL_DB_URL as string;
export const CERTIFICATE = process.env.SSL_CERT as string;
export const PRIV_KEY = process.env.SSL_PRIV_KEY as string;