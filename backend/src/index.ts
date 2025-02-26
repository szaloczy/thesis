import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});