import { Component, inject } from '@angular/core';

import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRole } from '../../types';

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
  roles: UserRole[] = Object.values(UserRole);
  registerForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  roleMap: Record<string, string> = {
    'hallgató': 'student',
    'mentor': 'mentor',
    'admin': 'admin'
  };

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
      const formValue = this.registerForm.value;

      const mappedValue = {
        ...formValue,
        role: this.roleMap[formValue.role]
      };
      this.authService.register(mappedValue)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/login')
          },
          error: (err) => {
            console.error(err);
            this.openSnackBar(err, 'okey');
          }
        });
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
