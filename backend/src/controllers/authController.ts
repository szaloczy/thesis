import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import { User } from "../types/user";
import jwt from "jsonwebtoken";

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
      const token = await authService.loginUser(username, password);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.json({ success: true, msg: "Login sucessful", data: token });
    } catch (error) {
      next(error);
    }
  }

  public authCheck(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.jwt;

      if (!token) {
        res.status(401).json({ success: false, msg: "Unauthorized" });
      }

      jwt.verify(token, process.env.SECRET_KEY as string);
      res.json({ success: true });
    } catch (error) {
      next(error)
    }
  }

  public getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.jwt;

      if(!token) {
        res.status(401).json({ success: false, msg: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { role: string };
      if(decoded.role == "admin" || decoded.role == "hallgato" || decoded.role == "oktato"){
        res.json({role: decoded.role})
      } else {
        res.status(400).json({ success: false, msg: "Invalid role"})
      }

    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController();
