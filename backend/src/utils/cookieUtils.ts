import { Request } from 'express';
import AppError from '../middlewares/appError';
import jwt from 'jsonwebtoken';

export function getUserIdFromCookie(req: Request): number | null {
    const token = req.cookies?.jwt;

    if(!token) {
        throw new AppError('Token must be provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id:number };
        return decoded.id;
    } catch (error) {
        return null;
    }
}