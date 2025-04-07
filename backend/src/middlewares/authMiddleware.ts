import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/user';

import { expressjwt } from "express-jwt";

export const checkUser = expressjwt({
    secret: "mySecretKey",
    algorithms: ["HS256"]
});

export const handleAuthorizationError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: 'Authentication is required for this operation.' });
    } else {
        next(err);
    }
};

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
