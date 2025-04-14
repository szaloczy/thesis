import db from '../config/db';

class CompanyService {
    public async getAllCompany() {
        const companies = await db.query('SELECT * FROM companies');

        return companies.rows;
    }

    public async getCompanyByUserId(userId: number) {
        const company = await db.query('SELECT * FROM companies WHERE user_id = $1',
            [userId]
        );

        return company.rows[0];
    }
}

export default new CompanyService();