import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { emit } from "process";

dotenv.config();

type AuthenticatedRequest = Request & { user?: { id: string; email: string }; token?: string };

export const authenTicateToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access token required" });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    // Attach user info to request object
    (req as AuthenticatedRequest).user = { id: decoded.id, email: decoded.email  };
    (req as AuthenticatedRequest).token = token;

    next();   
}