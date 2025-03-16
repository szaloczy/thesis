export interface User {
    id?: number;
  email: number;
  password: string;
  username: string;
  role: UserRole;
}

export enum UserRole {
  STUDENT = "hallgato",
  MENTOR = "oktato",
  ADMIN = "admin",
}
