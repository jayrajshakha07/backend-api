import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config/env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import errorHandler from "./middlewares/errorHandler";
import { setupSwagger } from "./utils/swagger";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
setupSwagger(app);
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
