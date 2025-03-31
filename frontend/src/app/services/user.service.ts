import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  http = inject(HttpClient);

  getUserData(): Observable<any> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/me`, { withCredentials: true }) }

  getAllUser(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/admin/get-all`, {withCredentials: true});
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/admin/get-all');
  }
}
