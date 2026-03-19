// backend/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from "helmet";
import authRoutes from './api/auth/auth.routes'
import dotenv from "dotenv";

dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Backend!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Auth routes 
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

export default app;