import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config/env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
<<<<<<< HEAD
import errorHandler from "./middlewares/errorHandler";
import bodyParser from "body-parser";
import a from "./routes/leads";
=======
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import errorHandler from "./middlewares/errorHandler";
import { setupSwagger } from "./utils/swagger";
import bodyParser from "body-parser";
>>>>>>> 197b562d7fd1aff9746ffc4d29703b6367c66f06

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());
app.use(morgan("dev"));
<<<<<<< HEAD
app.use(bodyParser.json());

app.use("/a", a);
=======
setupSwagger(app);
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
>>>>>>> 197b562d7fd1aff9746ffc4d29703b6367c66f06
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
