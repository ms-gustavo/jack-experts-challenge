import express from "express";
import { TaskController } from "../controllers/tasks.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/", authenticateToken, TaskController.getAllTasks);

export default router;
