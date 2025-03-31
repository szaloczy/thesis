import { Component, inject } from '@angular/core';

import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../types';
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

  error = false;
  errorMessage: string = '';
  successfulRegistration = false;
  successfulLogout = false;


  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.successfulRegistration = this.router.getCurrentNavigation()?.extras.state?.['successfulRegistration'];
    this.successfulLogout = this.router.getCurrentNavigation()?.extras.state?.['successfulLogout'];
  }

  onSubmit(): void {
    this.error = false;
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value as User)
      .pipe(
        catchError((err) => {
          switch (err.status) {
            case 504:
              this.openSnackBar('Server is not running', 'Close');
              break;
            case 401:
              this.openSnackBar('Wrong credentials', 'Close');
              break;
            default:
              this.openSnackBar('Wrong credentials', 'Close');
          }
          console.log(err);
          this.error = true;
          this.successfulRegistration = false;
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        if(res.success){
          this.authService.setLoginState(true);
          if(res.user.role === "admin"){
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/home'])
          }
        } else {
          this.router.navigate(['/login'])
        }
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
