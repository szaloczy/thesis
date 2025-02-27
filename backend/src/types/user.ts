import { UserRole } from "./enums";

export interface User {
    id: number;
    email: number;
    password_hash: string;
    username: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}

