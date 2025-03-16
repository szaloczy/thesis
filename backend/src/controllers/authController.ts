import { Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
    async signup (req: Request, res: Response) {
        try {
            const newUser = req.body;
            await authService.signupUser(newUser);
            res.status(201).json({success: true, data: newUser});
        } catch (error) {
            res.status(500).json({success: false, msg: 'Failed to create user'})
        }
    }

    async login (req: Request, res: Response) {
        console.log(req.body);
        res.send('login');
    }
}

export default new AuthController();