import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { DialogPhotosUpload } from '../../../interface/DialogPhotoUpload';
import { UploadImageDialog } from '../../upload/upload-images/upload-image-dialoge/upload-image-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { domain } from '../../../breakpoint';
const WIDTH_BREAK = 577;
@Component({
    selector: 'the-select-images',
    templateUrl: './select-images.component.html',
    styleUrls: ['./select-images.component.scss'],
    host: {
        class: "w-full"
    },
    imports: [MatDialogTitle, MatButton, MatIcon, CdkScrollable, MatDialogContent, NgClass, CdkDropList, CdkDrag, MatFormField, MatLabel, MatInput, ReactiveFormsModule, FormsModule, AsyncPipe]
})
export class SelectImagesComponent implements OnInit {

  public domain = domain;
  constructor(
    public dialogRef: MatDialogRef<SelectImagesComponent>,
    @Inject(MAT_DIALOG_DATA) public DialogPhotosUpload: DialogPhotosUpload,
    public dialog: MatDialog,
    breakpoints: BreakpointObserver
  ) {
    DialogPhotosUpload.photo && (this.selected = DialogPhotosUpload.photo);
    this.isScreenSmall = breakpoints.observe(`(max-width: ${WIDTH_BREAK}px)`)
      .pipe(map((breakpoint) => breakpoint.matches));
  }
  upload() {
    this.dialog.open(UploadImageDialog, { data: this.DialogPhotosUpload }).afterClosed();
  }
  isScreenSmall: Observable<boolean>;
  selected: any[] = [];
  delid: number | undefined;
  setdel(id: number | undefined) {
    this.delid = id;
  }
  delhover(event: Event) {
    event.preventDefault();
  }
  delimg(event: Event) {
    this.delid && this.DialogPhotosUpload.service.del(this.delid);
  }
  delhoverleave(event: Event) {

  }
  imagedrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selected, event.previousIndex, event.currentIndex);
  }
  addphoto = false;
  runfilter() {
    return this.DialogPhotosUpload.service.allState().pipe(map((i: []) => i.filter((m: { name: string; }) => m.name.toLowerCase().includes(this.filter.toLowerCase()))))
  }
  filter = "";
  onNoClick(): void {
    this.dialogRef.close([]);
  }
  select(photo: any) {
    this.selected.find(i => i == photo) || this.selected.push(photo);
  }
  removeselected(photo: any) {
    this.selected = this.selected.filter(i => i.id != photo.id);
  }
  proceed() {
    this.dialogRef.close(this.selected);
  }
  ngOnInit() {
    this.DialogPhotosUpload.service.all()
  }
}
