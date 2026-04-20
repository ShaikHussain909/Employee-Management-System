import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../department.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-department-dialog',
  templateUrl: './add-department-dialog.component.html',
  styleUrls: ['./add-department-dialog.component.css']
})
export class AddDepartmentDialogComponent {

  departmentName: string = '';

  constructor(
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<AddDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.departmentName = this.data.departmentName;
    }
  }

 save() {

  const data = {
    departmentName: this.departmentName
  };

  // EDIT MODE
  if (this.data && this.data.departmentId) {

    this.departmentService.updateDepartment(this.data.departmentId, data).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  // ADD MODE
  else {

    this.departmentService.createDepartment(data).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

 }
}