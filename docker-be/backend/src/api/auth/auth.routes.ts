import { loginController, registerController } from "./auth.controller";
import { validateRegister, validateLogin } from "./auth.validation";
import express from "express";

const router = express.Router();

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);


export default router;