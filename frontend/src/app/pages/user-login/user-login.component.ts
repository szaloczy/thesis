import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';



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
  loginForm: FormGroup;
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  toastrService = inject(ToastrService);

  error = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  onSubmit(): void {
    this.error = false;
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res => {
          console.log(res);
          this.authService.setToken(res.accessToken);
          this.router.navigate(['/home']);
        }),
        error: (err) => {
          this.toastrService.error(err.error.error, 'Error');
        }
      })
    }
  }
}
