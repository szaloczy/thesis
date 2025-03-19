import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY as string, (err: jwt.VerifyErrors | null, decodedToken: JwtPayload | string | undefined) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
} 

