import express from "express";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middlewares/errorHandler";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});