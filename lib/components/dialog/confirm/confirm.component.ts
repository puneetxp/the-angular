import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'the-angular/lib/interface/Confirm';
@Component({
  selector: 'the-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}