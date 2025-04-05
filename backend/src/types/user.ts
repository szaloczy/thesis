export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: UserRole;
}

export interface UserLoginDTO {
  success: boolean;
  token: string;
  user: UserDTO;
}

export interface UserDTO {
  id?: number;
  username: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  STUDENT = "student",
  MENTOR = "mentor",
  ADMIN = "admin",
}
