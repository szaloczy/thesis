import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, UserRole } from '../../types';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';

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
  router = inject(Router);

  currentUser: User = {
    username: '',
    password: '',
    email: '',
    role: UserRole.STUDENT
  }

  ngOnInit(): void {
    
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.authService.getCurrentUser().subscribe(user => {
          this.authService.currentUserSig.set(user);  
          this.currentUser = user;
        });
      } else {
        this.authService.currentUserSig.set(null); 
        
      }
    });
  }

  navigateToStudentForm() {
    this.router.navigateByUrl('/student-details')
  }
}
