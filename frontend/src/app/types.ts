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