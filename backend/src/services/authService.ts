import db from '../config/db';
import jwt from 'jsonwebtoken';
import { User } from '../types/user';
import { hashPassword, compareHash } from '../utils/hash';
import AppError from '../middlewares/appError';

class AuthService { 

    private generateToken (userId: number, role: string): string {
        return jwt.sign(
            {
                id: userId,
                role: role
            },
            process.env.SECRET_KEY as string,
            {
                expiresIn: '1h'
            }
        )
    }

    private isValidUser (user: User): boolean {
        if(!user.username || !user.email || !user.role || !user.password) {
            throw new AppError('All fileds are required', 400);
        }
        return true;
    }

    public async signupUser(user: User) {
    
            if (this.isValidUser(user)) {

            const existingUser = await db.query('SELECT * FROM users WHERE username = $1 OR email = $2',
                [user.username, user.email]
            );
            if (existingUser.rows.length > 0){
                throw new AppError('Username with this email or username already exists', 400);
            }

            const hashUserPassword = await hashPassword(user.password);

            const result = await db.query('INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
                [user.username, user.email, hashUserPassword, user.role]
            );
            return result.rows[0];
            } else {
                throw new Error('Invalid Credentials');
            }
    }

    public async loginUser(username: string, password: string) {
        
            if(!username || !password) {
                throw new AppError('All fields are required', 400);
            }

            const existingUser = await db.query('SELECT * FROM users WHERE username = $1',
                [username]
            );
            
            if (existingUser.rows.length === 0) {
                throw new AppError('User not found', 404);
            }

            const user = existingUser.rows[0];
            const isPasswordValid = await compareHash(password, user.password);
            if(!isPasswordValid) {
                throw new AppError('Invalid password', 401);
            }
    
            return {
                user,
                token: this.generateToken(user.id, user.role)
            }
    }
}

export default new AuthService();