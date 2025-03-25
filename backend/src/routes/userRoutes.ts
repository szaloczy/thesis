import express from "express";

import userController from "../controllers/userController";
import { requireAuth, verifyRole } from "../middlewares/authMiddleware";
import { UserRole } from "../types/user";

const router = express.Router();

//router.get("/users/:id", userController.getUser);
router.get("/users/me", requireAuth, userController.getCurrentUser);
router.get("/admin/get-all", requireAuth, verifyRole([UserRole.ADMIN]), userController.getAllUser);
router.get("/admin", requireAuth ,verifyRole([UserRole.ADMIN]), (req, res) => {
    res.json({ success: true, msg: "welcome, admin"});
});

export default router;
