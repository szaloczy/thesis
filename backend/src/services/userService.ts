import db from '../config/db';

class UserService {

    public async getUserById(id: number) {
        try {
            const result = await db.query('SELECT * FROM users WHERE id = $1',
                [id]
            );

            if (result.rows.length == 0) {
                throw new Error(`User with ${id} id not found`);
            }

            return result.rows[0];
        } catch (error) {
            throw new Error('User not foud');
        }
    }
}

export default new UserService();