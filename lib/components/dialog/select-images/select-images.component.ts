import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { DialogPhotosUpload } from 'the-angular/lib/interface/DialogPhotoUpload';
import { UploadImageDialog } from '../../upload/upload-images/upload-image-dialoge/upload-image-dialog.component';
const WIDTH_BREAK = 577;
@Component({
  selector: 'the-select-images',
  templateUrl: './select-images.component.html',
  styleUrls: ['./select-images.component.scss'],
  host: {
    class: "w-full"
  }
})
export class SelectImagesComponent implements OnInit {
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
