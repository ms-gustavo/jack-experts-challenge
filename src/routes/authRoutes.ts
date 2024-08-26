import express from "express";
import { validateDTO } from "../middlewares/validate.middleware";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { AuthController } from "../controllers/auth.controller";
import { LoginDTO } from "../dtos/login.dto";
const router = express.Router();

router.post("/register", validateDTO(CreateUserDTO), AuthController.register);
router.post("/login", validateDTO(LoginDTO), AuthController.login);

export default router;
