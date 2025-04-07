export interface UserDTO {
    email: string;
    username: string;
    password: string;
    role: userRole;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
}

export enum userRole {
    STUDENT,
    MENTOR,
    ADMIN,
}