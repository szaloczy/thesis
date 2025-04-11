import { Request, Response, NextFunction } from "express";
import { Student } from "../types/student";
import studentService from "../services/studentService";

class StudentController {

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const student = req.body as Student;

            if (!student.full_name && !student.major && !student.neptun && !student.university) {
                res.status(401).json({ success: false, error:'All fields are required'})
            }

            const result = studentService.createStudent(student);

            res.status(201).json({ result })
        } catch (error) {
            next(error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    }
}

export default new StudentController();