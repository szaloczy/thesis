import db from '../config/db';
import { Student } from '../types/student';

class StudentService {
    public async createStudent(student: Student) {
        const result = await db.query("INSERT INTO students (full_name, neptun, major, university) VALUES ($1, $2, $3, $4)", 
            [student.full_name, student.neptun, student.major, student.university]
        );

        return result.rows[0];
    }
}

export default new StudentService();