import express from "express";
import userController from "../controllers/userController";
import { UserRole } from "../types/user";
import { checkUser, verifyRole } from "../middlewares/authMiddleware";

const router = express.Router();

//router.get("/users/:id", userController.getUser);
router.get("/users/me", checkUser, userController.getCurrentUser);
router.get("/admin/get-all", checkUser, verifyRole([UserRole.ADMIN]), userController.getAllUser);
router.get("/admin", checkUser ,verifyRole([UserRole.ADMIN]), (req, res) => {
    res.json({ success: true, msg: "welcome, admin"});
});

export default router;
