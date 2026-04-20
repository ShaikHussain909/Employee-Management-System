import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {

  onAddEmployee() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }
   
onEdit(employee: any) {
  const dialogRef = this.dialog.open(EmployeeDialogComponent, {
    width: '500px',
    data: employee   // 👈 pass employee to dialog
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      this.loadEmployees(); // refresh table after update
    }
  });
}

onDelete(id: number) {

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: {
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this employee?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee deleted successfully'); // we will upgrade this later to snackbar
          this.loadEmployees();
        },
        error: (err: any) => {
          console.error(err);
          alert('Delete failed');
        }
      });
    }
  });
}

  displayedColumns: string[] = [
    'empId',
    'firstName',
    'lastName',
    'email',
    'phone',
    'salary',
    'departmentName',
    'designationName',
     'actions'
  ];

  dataSource: any[] = [];
  totalRecords = 0;
  pageSize = 5;
  pageNumber = 1;
  searchText = '';
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
   // private confirmDialog: MatDialog

  ) {}

  role: string | null = '';
  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.loadEmployees();
  }

  loadEmployees() {
  this.isLoading = true;   // 👈 START spinner

  this.employeeService
    .getEmployees(this.pageNumber, this.pageSize, this.searchText)
    .subscribe({
      next: (res: any) => {
        this.dataSource = res.data.records;
        this.totalRecords = res.data.totalRecords;
        this.isLoading = false;  // 👈 STOP spinner
      },
      error: () => {
        this.isLoading = false;  // 👈 STOP spinner even if error
      }
    });
}

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadEmployees();
  }

  onSearch() {
    this.pageNumber = 1;
    this.loadEmployees();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
 
  canEdit(): boolean {
  return this.role === 'Admin' || this.role === 'HR';
}

canDelete(): boolean {
  return this.role === 'Admin';
}

}