import { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';

class userController {

    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);

            if(isNaN(id)) {
                res.status(400).json({ success: false, msg: 'Invalid user ID' });
            }
    
            const user = await userService.getUserById(id);
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, username, role, password } = req.body;

            if(!email || !username || !role || !password) {
                res.status(400).json({ success:false, msg: 'All field are Required'})
            }

            const user = await userService.registerUser(email, username, password, role);
            res.status(201).json({ success: true, data: user })
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            if(!username || !password) {
                res.status(400).json({ success:false, msg: 'All fields are required'})
            }

            const token = await userService.loginUser(username, password);
            res.status(200).json({ success: true, data: token });
        } catch (error) {
            next(error);
        }
    }
}

export default new userController;