import { inject, Injectable } from '@angular/core';
import { StudentDTO } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 
  http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api/student'

  create(updatedData: StudentDTO) {
    return this.http.post<StudentDTO>(`${this.apiUrl}`, updatedData, {withCredentials: true});
  }

  getStudentData() {
    return this.http.get<StudentDTO>(`${this.apiUrl}`, {withCredentials: true});
  }
}
