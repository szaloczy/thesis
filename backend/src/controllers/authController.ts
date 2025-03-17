import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import { User } from "../types/user";

class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser: User = req.body;
      const result = await authService.signupUser(newUser);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const result = await authService.loginUser(username, password);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
