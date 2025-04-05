export interface User {
    id?: string;
    username: string;
    password: string;
    email: string;
    role: UserRole;
}

export interface ApiResponse {
  success: boolean;
  data: User;
}

export interface UserLoginDTO {
    success: boolean;
    user: User;
    token: string;
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