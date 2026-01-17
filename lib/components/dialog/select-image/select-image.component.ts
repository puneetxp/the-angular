import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DialogPhotoUpload } from '../../../interface/DialogPhotoUpload';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
import { UploadImagesComponent } from '../../upload/upload-images/upload-images.component';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { domain } from '../../../breakpoint';

@Component({
    selector: 'the-select-image',
    templateUrl: './select-image.component.html',
    styleUrls: ['./select-image.component.scss'],
    host: {
        class: "w-full"
    },
    imports: [MatDialogTitle, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, UploadImagesComponent, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, ReactiveFormsModule, FormsModule, MatDialogClose, AsyncPipe]
})
export class SelectImageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectImageComponent>,
    @Inject(MAT_DIALOG_DATA) public DialogPhotoUpload: DialogPhotoUpload,
  ) {
  }
  public domain = domain;
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
