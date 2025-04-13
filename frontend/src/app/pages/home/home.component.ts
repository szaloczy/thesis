import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StudentDTO, User, UserRole } from '../../types';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-home',
  imports: [
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit {

  authService = inject(AuthService);
  studentService = inject(StudentService);
  router = inject(Router);

  currentUser: User = {
    username: '',
    password: '',
    email: '',
    role: UserRole.STUDENT 
  }

  studentData: StudentDTO = {
    full_name: '',
    neptun: '',
    major: '',
    university: '',
    company_id: 0,
    mentor_id: 0
  }

  ngOnInit(): void {
    
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.authService.getCurrentUser().subscribe(user => {
          this.authService.currentUserSig.set(user);  
          this.currentUser = user;
        });

        this.studentService.getStudentData().subscribe({
          next: (res) => {
            console.log(res);
            this.studentData = res;
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        this.authService.currentUserSig.set(null); 
      }
    });
  }

  navigateToStudentForm() {
    this.router.navigateByUrl('/student-details')
  }

  translateUserRole(role: string): string {
    switch (role) {
      case 'student':
        return 'Hallgató';
      case 'mentor':
        return 'Mentor';
      case 'admin':
        return 'Admin';
      default:
        return 'Ismeretlen';
    }
  }
}
