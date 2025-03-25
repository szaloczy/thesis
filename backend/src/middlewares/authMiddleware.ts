import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../types/user';

export const requireAuth = (req: Request, res:Response, next: NextFunction) => {
    const token = req.cookies?.jwt;

    if (!token) {
         res.status(401).json({ success: false, msg: 'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
        (req as any).user = decoded;
        next();
    } catch(err) {
         res.status(401).json({success: false, msg: 'Invalid Token'})
    }
}

export const verifyRole = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if(!user) {
             res.status(401).json({ success: false, msg: 'Unauthorized' });
        }

        if (!roles.includes(user.role)) {
             res.status(403).json({ success: false, msg: 'Forbidden' });
        }

        next();
    };
};
