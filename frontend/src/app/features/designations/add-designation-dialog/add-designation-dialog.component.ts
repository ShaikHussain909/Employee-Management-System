import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesignationService } from '../designations/designation.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-designation-dialog',
  templateUrl: './add-designation-dialog.component.html',
  styleUrls: ['./add-designation-dialog.component.css']
})
export class AddDesignationDialogComponent {

  designationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private designationService: DesignationService,
    private dialogRef: MatDialogRef<AddDesignationDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.designationForm = this.fb.group({
      designationName: ['', Validators.required]
    });
  }

save() {

  if (this.designationForm.valid) {

    const designation = {
      designationName: this.designationForm.value.designationName
    };

    if (this.data) {

      // UPDATE designation
      this.designationService
        .updateDesignation(this.data.designationId, designation)
        .subscribe(() => {
          this.dialogRef.close(true);
        });

    } else {

      // ADD designation
      this.designationService
        .addDesignation(designation)
        .subscribe(() => {
          this.dialogRef.close(true);
        });

    }

  }

}

  close() {
    this.dialogRef.close();
  }
}