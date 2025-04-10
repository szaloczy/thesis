import { Component, inject } from '@angular/core';

import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginUserDTO, User } from '../../types';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-user-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  private snackBar = inject(MatSnackBar);

  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: LoginUserDTO) => {
          if(this.authService.isLoggedIn() && res.success){
            this.authService.currentUserSig.set(res.user);
            if(res.user.role === 'admin') {
              this.router.navigateByUrl('/admin');
            } else {
              this.router.navigateByUrl('/home');
            }
          }
        },
        error: (err) => {
          this.openSnackBar(err.error.msg, 'Close');
        }
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
