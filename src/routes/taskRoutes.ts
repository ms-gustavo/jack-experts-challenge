import express from "express";
import { TaskController } from "../controllers/tasks.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateDTO } from "../middlewares/validate.middleware";
import { CreateTaskDTO } from "../dtos/create-task.dto";
const router = express.Router();

router.get("/", authenticateToken, TaskController.getAllTasks);
router.post(
  "/create",
  authenticateToken,
  validateDTO(CreateTaskDTO),
  TaskController.createTask
);

export default router;
