import { regiterUser, loginUser } from "./auth.service";
import { Request, Response } from 'express';
import { generateToken } from "../../utils/jwtGenerator";

const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const user = await regiterUser(name, email, password);

        const token = generateToken(user.id, user.email);

        res.status(201).json({
            message: "Registered successfully",
            user,
            token,
        })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        const token = generateToken(user.id, user.email);

        res.status(200).json({
            message: "Login successful",
            user,
            token,
        })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}


export { registerController, loginController };