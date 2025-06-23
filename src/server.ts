import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config/env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import bodyParser from "body-parser";
import a from "./routes/leads";

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
app.use(bodyParser.json());

app.use("/a", a);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
