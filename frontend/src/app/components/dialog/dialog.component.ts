import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-dialog',
  imports: [
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogRef
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  dataForm: FormGroup;
  studentService = inject(StudentService);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>
    ) {
    this.dataForm = fb.group({
      full_name: ['', [Validators.required]],
      neptun: ['', [Validators.required]],
      university: ['', [Validators.required]],
      major: ['', [Validators.required]]
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.dataForm.valid) {
      this.studentService.updateStudentData(this.dataForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

}
