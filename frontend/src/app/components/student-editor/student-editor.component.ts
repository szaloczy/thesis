import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { StudentDTO } from '../../types';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-student-editor',
  imports: [
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './student-editor.component.html',
  styleUrl: './student-editor.component.scss'
})
export class StudentEditorComponent {
private snackBar = inject(MatSnackBar);

  studentForm: FormGroup;
  studentService = inject(StudentService);
  router = inject(Router);

  errorMessage: string = '';
  companies = [];
  mentors = [];

  constructor(private fb: FormBuilder) {
    this.studentForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if(this.studentForm.valid) {
      this.studentService.create(this.studentForm.value).subscribe({
        next: (res: StudentDTO) => {
          
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
