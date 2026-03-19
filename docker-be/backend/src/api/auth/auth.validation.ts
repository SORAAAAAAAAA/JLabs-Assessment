import { NextFunction } from "express";
import { Request, Response } from "express";

async function validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email) {
    return res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    next();
}


async function validateRegister(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 8) {
        return res.status(400).json({
        error: "Password must be at least 8 characters",
        });
    }

    next();
}

export { validateLogin, validateRegister };