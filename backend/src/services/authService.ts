import db from "../config/db";
import { User } from "../types/user";

class AuthService { 

    async signupUser (user: User) {
        try {
            if(!user.username || !user.email || !user.role || !user.password) {
                throw new Error('All field required');
            }
            const result = await db.query("INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
                [user.username, user.email, user.password, user.role]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Invalid Credentials');
        }
    }
}

export default new AuthService();