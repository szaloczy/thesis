export interface User {
    id?: string;
    username: string;
    password: string;
    email: string;
    role: UserRole;
}

export interface LoginUserDTO {
    success: boolean;
    token: string;
    user: User;
}

export interface StudentDTO {
    full_name: string;
    neptun: string;
    major: string;
    university: string;
    company_id: number;
    mentor_id: number;
}

export interface Company {
    id: number;
    name: string;
    address: string;
}

export interface Mentor {
    id: number;
    user_id: number;
    full_name: string;
    company_id: number;
}

export interface DecodedToken {
    userId: number;
    role: UserRole;
    iat: number;
    exp: number;
}

export enum UserRole {
    STUDENT = 'hallgató',
    MENTOR = 'mentor',
    ADMIN = 'admin'
}