import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Company } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  http = inject(HttpClient);
  
  private readonly apiUrl = 'http://localhost:3000/api/'
  
  getAll() {
    return this.http.get<Company[]>(`${this.apiUrl}/companies`, { withCredentials: true });
  }

  getOne() {
    return this.http.get<Company[]>(`${this.apiUrl}/company`, { withCredentials: true });
  }
}
