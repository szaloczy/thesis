import { inject, Injectable } from '@angular/core';
import { StudentDTO } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 
  http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api/students'

  updateStudentData(updatedData: StudentDTO) {
    return this.http.put<StudentDTO>(`${this.apiUrl}`, updatedData, {withCredentials: true});
  }
}
