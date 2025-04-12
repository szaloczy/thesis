import db from '../config/db';
import { Student } from '../types/student';

class StudentService {
    public async createStudent(student: Student) {
        const result = await db.query("INSERT INTO students (full_name, neptun, major, university, user_id, company_id, mentor_id) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
            [student.full_name, student.neptun, student.major, student.university, student.user_id, student.company_id, student.mentor_id]
        );

        return result.rows[0];
    }
}

export default new StudentService();