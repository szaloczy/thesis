import db from '../config/db';

class CompanyService {
    public async getAllCompany() {
        const companies = await db.query("SELECT * FROM companies");

        return companies.rows;
    }
}

export default new CompanyService();