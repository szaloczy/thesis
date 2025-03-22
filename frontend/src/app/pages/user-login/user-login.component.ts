import { Component, inject } from '@angular/core';

import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private _snackBar = inject(MatSnackBar);

  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .subscribe((response) => {
        if (this.authService.isLoggedIn()) {
          this.authService.getUserRole().subscribe( role => {
            if(role === "admin") {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/'])
            }
          });
        } 
        if(!response.success){
          this.errorMessage = response.msg;
          this._snackBar.open(this.errorMessage as string, 'close', {
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['snackBar']
          })
        }
      })
    }

    this.errorMessage = null;
  }

}
