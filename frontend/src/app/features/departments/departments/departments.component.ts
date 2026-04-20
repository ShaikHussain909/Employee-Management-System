import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDepartmentDialogComponent } from '../add-department-dialog/add-department-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  displayedColumns: string[] = ['departmentId', 'departmentName', 'actions'];
  dataSource: any[] = [];

  constructor(
    private departmentService: DepartmentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.dataSource = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openAddDepartmentDialog() {
    const dialogRef = this.dialog.open(AddDepartmentDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDepartments();
      }
    });
  }

  editDepartment(department: any) {
    const dialogRef = this.dialog.open(AddDepartmentDialogComponent, {
      width: '400px',
      data: department
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDepartments();
      }
    });
  }

 deleteDepartment(id: number) {

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: {
      message: 'Are you sure you want to delete this department?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {

      this.departmentService.deleteDepartment(id).subscribe({
        next: () => {
          this.loadDepartments();
        },
        error: (err) => {
          console.error(err);
        }
      });

    }

  });

}

}