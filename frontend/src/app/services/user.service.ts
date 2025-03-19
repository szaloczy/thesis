import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  role: string;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  data: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Cseréld ki a pontos végpontra!

  constructor(private http: HttpClient) {}

  getUserData(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
