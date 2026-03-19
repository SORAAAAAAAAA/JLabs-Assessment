import app from './app';
import dotenv from "dotenv";
import { POOL } from './config/database';

dotenv.config();

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST as string;

const connectWithRetry = () => {
  POOL.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.log('Database not ready, retrying in 2 seconds...');
      setTimeout(connectWithRetry, 2000);
    } else {
      console.log('Connected to Database successfully:', res.rows[0]);
    }
  });
};

async function startServer() {
    try {
         connectWithRetry();
         
         app.listen(PORT, HOST, () => {
            console.log(`Server running on http://${HOST}:${PORT}`);
         });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

export {POOL}

startServer();