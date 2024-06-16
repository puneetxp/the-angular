import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DialogPhotoUpload } from 'the-angular/lib/interface/DialogPhotoUpload';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { UploadImagesComponent } from '../../upload/upload-images/upload-images.component';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';

@Component({
    selector: 'the-select-image',
    templateUrl: './select-image.component.html',
    styleUrls: ['./select-image.component.scss'],
    host: {
        class: "w-full"
    },
    standalone: true,
    imports: [MatDialogTitle, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, UploadImagesComponent, NgIf, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, ReactiveFormsModule, FormsModule, NgFor, MatDialogClose, AsyncPipe]
})
export class SelectImageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectImageComponent>,
    @Inject(MAT_DIALOG_DATA) public DialogPhotoUpload: DialogPhotoUpload,
  ) {
  }
  delid: number | undefined;
  setdel(id: number | undefined) {
    this.delid = id;
  }
  delhover(event: Event) {
    event.preventDefault();
  }
  delimg(event: Event) {
    this.delid && this.DialogPhotoUpload.service.del(this.delid);
  }
  delhoverleave(event: Event) {

  }
  addphoto = false;
  runfilter() {
    return this.DialogPhotoUpload.service.allState().pipe(map((i:[]) => i.filter((m: { name: string; }) => m.name.toLowerCase().includes(this.filter.toLowerCase()))))
  }
  filter = "";
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.DialogPhotoUpload.service.all()
  }
}
