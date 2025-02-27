import db from "../config/db";
import { UserRole } from "../types/enums";
import { User } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class UserService {

    public async getUserById(id: number) {
        try {
            const result = await db.query("SELECT * FROM users WHERE id = $1",
                [id]
            );

            if (result.rows.length == 0) {
                throw new Error(`User with ${id} id not found`);
            }

            return result.rows[0];
        } catch (error) {
            throw new Error("User not foud");
        }
    }

    public async registerUser(email: string, username: string, password: string, role: UserRole): Promise<User | null> {
        try {
            const existingUser = await db.query("SELECT * from users WHERE email = $1",
                [email]
            );

            if (existingUser.rows.length > 0) {
                throw new Error("User with this email is already exists")
            }

            const hashedPassword = await bcrypt.hash(password, 2);

            const result = await db.query("INSERT INTO users (email, username, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *", 
                [email, username, hashedPassword, role]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error("Failed to create user");
        }
    }

    public async loginUser(email: string, password: string) {
        try {
            const result = await db.query("SELECT * from users WHERE email = $1",
                [email]
            );

            if (result.rows.length < 0) {
                throw new Error("Invalid email");
            }

            const user = result.rows[0] as User;

            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                throw new Error("Invalid passsword");
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.SECRET_KEY as string,
                { expiresIn: '1d'}
        );
        return token;
        } catch (error) {
            throw new Error("Failed to login user")
        }
    } 
}

export default new UserService();