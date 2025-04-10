import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import userService from '../services/userService';

class userController {
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ success: false, msg: 'Invalid user ID' });
      }

      const user = await userService.getUserById(id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  public async getAllUser(req: Request, res:Response, next: NextFunction) {
    try {
      const users = await userService.getAllUser();
      res.json({ success: true, data: users})
    } catch (error) {
      next(error); 
    }
  }

  public async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    if(!token) {
        res.status(401).json({success: false, msg: 'No token provided'})
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as jwt.JwtPayload & { userId: number };

      const user = await userService.getUserById(decoded.userId);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
