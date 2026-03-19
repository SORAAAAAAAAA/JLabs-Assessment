import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const POOL = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD as string,
  port: Number(process.env.POSTGRES_PORT),
});

export { POOL };
