import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
