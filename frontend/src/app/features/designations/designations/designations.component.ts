import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DesignationService } from './designation.service';
import { AddDesignationDialogComponent } from '../add-designation-dialog/add-designation-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css']
})
export class DesignationsComponent implements OnInit {

  designations: any[] = [];

  displayedColumns: string[] = ['designationName', 'actions'];

  constructor(
    private designationService: DesignationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDesignations();
  }

  loadDesignations() {
    this.designationService.getDesignations().subscribe((response: any) => {
      this.designations = response.data; // Adjust based on your API response structure
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddDesignationDialogComponent, {
      width: '400px',
       
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDesignations();
      }
    });
  }

  openEditDialog(designation: any) {
    const dialogRef = this.dialog.open(AddDesignationDialogComponent, {
      width: '400px',
      data: designation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDesignations();
      }
    });
  }

  deleteDesignation(designation: any) {

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: {
      message: 'Are you sure you want to delete this designation?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {

      this.designationService
        .deleteDesignation(designation.designationId)
        .subscribe(() => {
          this.loadDesignations();
        });

    }

  });

}
}
