import { Component, inject } from '@angular/core';

import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  roles: string[] = ['hallgató', 'oktato', 'admin'];
  registerForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  _snackBar = inject(MatSnackBar);

  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value)
        .subscribe({
          next: (response) => {
            this.router.navigate(["/login"]);
          },
          error: (error) => {
            // Ha az error.msg nem található, akkor használj error.error.msg-t, attól függően, hogyan van szervezve az API válasza
            this.errorMessage = error.error?.msg || 'An unexpected error occurred';
            this._snackBar.open(this.errorMessage as string, 'close');
          }
        });
    }
  }
}
