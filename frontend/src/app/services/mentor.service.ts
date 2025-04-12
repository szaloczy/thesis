import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Mentor } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  http = inject(HttpClient);
    
  private readonly apiUrl = 'http://localhost:3000/api/mentor'
    
  getAll() {
    return this.http.get<Mentor[]>(`${this.apiUrl}`, { withCredentials: true });
  }
}
