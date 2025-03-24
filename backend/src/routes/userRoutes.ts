import express from "express";
import { requireAuth, verifyRole } from "../middlewares/authMiddleware";
import userController from "../controllers/userController";
import { UserRole } from "../types/user";

const router = express.Router();

router.get("/users/:id", requireAuth, userController.getUser);
router.get("/admin/get-all", requireAuth, verifyRole([UserRole.ADMIN]),userController.getAllUser);
router.get("/admin", requireAuth ,verifyRole([UserRole.ADMIN]), (req, res) => {
    res.json({ success: true, msg: "welcome, admin"});
});

export default router;
