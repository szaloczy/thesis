import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';
import { Router, RouterLink } from '@angular/router';
import { Company, Mentor, StudentDTO } from '../../types';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CompanyService } from '../../services/company.service';
import { MentorService } from '../../services/mentor.service';

@Component({
  selector: 'app-student-editor',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './student-editor.component.html',
  styleUrl: './student-editor.component.scss'
})
export class StudentEditorComponent implements OnInit{
private snackBar = inject(MatSnackBar);

  studentForm: FormGroup;
  studentService = inject(StudentService);
  companyService = inject(CompanyService);
  mentorService = inject(MentorService);
  router = inject(Router);

  errorMessage: string = '';
  companies: Company[] = [];
  mentors: Mentor[] = [];

  constructor(private fb: FormBuilder) {
    this.studentForm = fb.group({
      full_name: ['', [Validators.required]],
      neptun: ['', [Validators.required]],
      major: ['', [Validators.required]],
      university: ['', [Validators.required]],
      company_id: ['', [Validators.required]],
      mentor_id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.companies = res as Company[]; 
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.mentorService.getAll().subscribe({
      next: (res) => {
        this.mentors = res as Mentor[]; 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    if(this.studentForm.valid) {
      this.studentService.create(this.studentForm.value).subscribe({
        next: (res: StudentDTO) => {
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.openSnackBar(err.error.error, 'Close');
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
