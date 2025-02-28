import { Component } from '@angular/core';

import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

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
  roles: string[] = ['Hallgató', 'Mentor', 'Adminisztrátor'];
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role:['', [Validators.required]]
    });
  }

  onSubmit(): void {
  }
}
