import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (
    userID: string,
    email: string
) => {
    const payload = {
        userID,
        email,
    }
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });
}