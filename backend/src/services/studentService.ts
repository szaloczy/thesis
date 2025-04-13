import db from '../config/db';
import AppError from '../middlewares/appError';
import { Student } from '../types/student';

class StudentService {
    private async isValidUser(neptun: string): Promise<boolean> {
        const existingStudent = await db.query('SELECT * FROM students WHERE neptun = $1',
            [neptun]
        );

        if (existingStudent.rows.length > 0) {
            throw new AppError('User with this neptun code already exists');
        }

        return true;
    }

    public async createStudent(student: Student) {
        await this.isValidUser(student.neptun);

        const result = await db.query('INSERT INTO students (full_name, neptun, major, university, user_id, company_id, mentor_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
            [student.full_name, student.neptun, student.major, student.university, student.user_id, student.company_id, student.mentor_id]
        );

        return result.rows[0];
    }

    public async getStudentById(id: number) {
        const result = await db.query('SELECT * FROM students WHERE user_id = $1',
            [id]
        );

        return result.rows[0];
    }
}

export default new StudentService();