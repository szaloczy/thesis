import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRotues";
import studentRoutes from "./routes/studentRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
