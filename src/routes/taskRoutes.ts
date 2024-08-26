import express from "express";
import { TaskController } from "../controllers/tasks.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateDTO } from "../middlewares/validate.middleware";
import { CreateTaskDTO } from "../dtos/create-task.dto";
import { UpdateTaskDTO } from "../dtos/update-task.dto";
const router = express.Router();

router.get("/", authenticateToken, TaskController.getAllTasks);
router.get("/:id", authenticateToken, TaskController.getTask);
router.post(
  "/create",
  authenticateToken,
  validateDTO(CreateTaskDTO),
  TaskController.createTask
);
router.put(
  "/:id",
  authenticateToken,
  validateDTO(UpdateTaskDTO),
  TaskController.updateTask
);
router.delete("/:id", authenticateToken, TaskController.deleteTask);

export default router;
