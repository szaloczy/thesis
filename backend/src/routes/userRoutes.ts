import express from "express";

import userController from "../controllers/userController";
import { UserRole } from "../types/user";
import { verifyRole } from "../middlewares/authMiddleware";

const router = express.Router();

//router.get("/users/:id", userController.getUser);
router.get("/users/me", userController.getCurrentUser);
router.get("/admin/get-all", verifyRole([UserRole.ADMIN]), userController.getAllUser);
router.get("/admin", verifyRole([UserRole.ADMIN]), (req, res) => {
    res.json({ success: true, msg: "welcome, admin"});
});

export default router;
