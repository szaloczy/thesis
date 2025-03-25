import { inject, Injectable, signal } from '@angular/core';
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
  private apiUrl = 'http://localhost:3000/api/users';

  http = inject(HttpClient);

  private userSignal = signal<User | null>(null);

  getUserData(id: number): void {
    this.http.get<ApiResponse>(`${this.apiUrl}/me`, { withCredentials: true })
    .subscribe((res)  => {
      if(res.success) {
        this.userSignal.set(res.data)
      } 
    });
  }

  getAllUser(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/admin/get-all`, {withCredentials: true});
  }

  get user() {
    return this.userSignal;
  }

  setUser(user: User) {
    this.userSignal.set(user);
  }

  clearUser(): void {
    this.userSignal.set(null);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/admin/get-all');
  }
}
