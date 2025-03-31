export interface User {
    id?: string;
    username: string;
    email: string;
    role: UserRole;
}

export interface ApiResponse {
  success: boolean;
  data: User;
}

export interface LoginResponse {
    success: boolean;
    msg: string;
    data: string;
}

export interface DecodedToken {
    userId: number;
    role: UserRole;
    iat: number;
    exp: number;
}

export enum UserRole {
    hallgato,
    oktato,
    admin
}