import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DialogPhotoUpload } from 'the-angular/lib/interface/DialogPhotoUpload';

@Component({
  selector: 'the-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss'],
  host: {
    class: "w-full"
  }
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
