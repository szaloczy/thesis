import express from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/users/:id", requireAuth, userController.getUser);

export default router;
