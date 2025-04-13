import { Request, Response, NextFunction } from "express";
import { Student } from "../types/student";
import studentService from "../services/studentService";
import jwt from 'jsonwebtoken';
import AppError from "../middlewares/appError";

class StudentController {

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.jwt;
            if(!token) {
                res.status(401).json({success: false, msg: 'No token provided'});
                return;
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as jwt.JwtPayload & { userId: number };
            const student = req.body as Student;
            student.user_id = decoded.userId;

            if (!student.full_name && !student.major && !student.neptun && !student.university && !student.user_id && !student.company_id && !student.mentor_id) {
                res.status(401).json({ success: false, error:'All fields are required'});
                return;
            }

            const result = await studentService.createStudent(student);

            res.status(201).json({ result })
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }

            next(error);
            res.status(500).json('Internal server error');
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.jwt;
            if(!token) {
                res.status(401).json({success: false, msg: 'No token provided'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as jwt.JwtPayload & { userId: number };

            const result = await studentService.getStudentById(decoded.userId);

            res.status(201).json(result);
        } catch (error) {
            next(error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    }
}

export default new StudentController();