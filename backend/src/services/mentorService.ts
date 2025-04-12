import db from '../config/db';

class MentorService {
    public async getAllMentor() {
        const companies = await db.query("SELECT * FROM mentors");

        return companies.rows;
    }
}

export default new MentorService();