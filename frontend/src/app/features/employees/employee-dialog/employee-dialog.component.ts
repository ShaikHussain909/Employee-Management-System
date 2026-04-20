import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {


  employeeForm: FormGroup;
  isEditMode = false;
  departments: any[] = [];
  designations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
      private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      salary: ['', Validators.required],
      departmentId: ['', Validators.required],
      designationId: ['', Validators.required]
    });

    //  if (data) {
    //  this.isEditMode = true;
    // this.employeeForm.patchValue(data);
    //}
  }

  ngOnInit(): void {
    this.employeeService.getDepartments().subscribe((res: any) => {
      this.departments = res.data;
    });

    this.employeeService.getDesignations().subscribe((res: any) => {
      this.designations = res.data;
    });

    if (this.data) {
      this.isEditMode = true;
      this.employeeForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        phone: this.data.phone,
        salary: this.data.salary,
        departmentId: this.data.departmentId,
        designationId: this.data.designationId
      });
    }
  }
 onSubmit() {
  if (this.employeeForm.invalid) return;

  if (this.isEditMode) {

    const updatedEmployee = {
      FirstName: this.employeeForm.value.firstName,
      LastName: this.employeeForm.value.lastName,
      Email: this.employeeForm.value.email,
      Phone: this.employeeForm.value.phone,
      Salary: Number(this.employeeForm.value.salary),
      DepartmentId: Number(this.employeeForm.value.departmentId),
      DesignationId: Number(this.employeeForm.value.designationId),
      IsActive: true
    };

    this.employeeService
      .updateEmployee(this.data.empId, updatedEmployee)
      .subscribe({
        next: () => {
          this.snackBar.open('Employee updated successfully!', 'Close', {
            duration: 3000
          });

          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open('Update failed!', 'Close', {
            duration: 3000
          });
          console.error(err);
        }
      });

  } else {

    const newEmployee = {
      FirstName: this.employeeForm.value.firstName,
      LastName: this.employeeForm.value.lastName,
      Email: this.employeeForm.value.email,
      Phone: this.employeeForm.value.phone,
      Salary: Number(this.employeeForm.value.salary),
      DepartmentId: Number(this.employeeForm.value.departmentId),
      DesignationId: Number(this.employeeForm.value.designationId),
      IsActive: true
    };

    this.employeeService
      .addEmployee(newEmployee)
      .subscribe({
        next: () => {
          this.snackBar.open('Employee added successfully!', 'Close', {
            duration: 3000
          });

          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open('Add failed!', 'Close', {
            duration: 3000
          });
          console.error(err);
        }
      });
  }
}

  onCancel() {
    this.dialogRef.close();
  }
}


