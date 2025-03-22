import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../types/user';

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(
            token,
            process.env.SECRET_KEY as string,
            (
                err: jwt.VerifyErrors | null,
                decodedToken: JwtPayload | string | undefined
            ) => {
                if (err) {
                    console.log(err.message);
                    res.redirect('/login');
                } else {
                    console.log(decodedToken);
                    next();
                }
            }
        );
    } else {
        res.redirect('/login');
    }
};

export const verifyRole = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt;

        if(!token) {
            res.status(401).json({ success: false, msg: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {role: UserRole};
            if( !roles.includes(decoded.role)) {
                res.status(403).json({ success: false, msg: 'Forbidden'})
            }
            next();
        } catch (error) {
            res.status(401).json({ success: false, msg: 'Invalid token'});
        }
    };
};
