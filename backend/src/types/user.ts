export interface User {
    id: number;
    email: number;
    password: string;
    name: string;
    role: 'student' | 'mentor' | 'admin';
    created_at: Date;
    updated_at: Date;
}

