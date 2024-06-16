import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { DialogPhotoUpload } from 'the-angular/lib/interface/DialogPhotoUpload';
import { FormDataService } from 'the-angular/lib/service/Form/FormData.service';
import { ImageService } from 'the-angular/lib/service/image.service';
import { LoginService } from 'the-angular/lib/service/login.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FileDragNDropDirective } from '../../../directive/file-drag-drop';
import { MatInput } from '@angular/material/input';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'the-upload-dialog',
    templateUrl: './upload-image-dialog.component.html',
    styleUrls: ['./upload-image-dialog.component.scss'],
    host: {
        class: "w-full"
    },
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, NgClass, MatLabel, MatInput, NgIf, FileDragNDropDirective, MatProgressSpinner, MatButton, MatIcon, NgFor, MatDialogActions, MatDialogClose]
})
export class UploadImageDialog {
  constructor(
    public dialogRef: MatDialogRef<UploadImageDialog>,
    @Inject(MAT_DIALOG_DATA) public DialogPhotoUpload: DialogPhotoUpload,
    private _snackBar: MatSnackBar,
    public Form: FormDataService,
    public http: HttpClient,
    public login: LoginService,
    public ImageService: ImageService,
    public store: Store
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  photos: DataTransfer = new DataTransfer();
  Array = Array;
  URL = URL;
  progress = 0;
  @Output() close = new EventEmitter<boolean>();
  @Output() uploadphoto = new EventEmitter<FormDataService>();
  @Input() diredit = false;
  // Submit Form

  dragevent(event: DragEvent) {
    if (event.dataTransfer instanceof DataTransfer) {
      this.addphotos(event.dataTransfer.files);
    }
  }

  removeimage(index: number) {
    this.photos.items.remove(index);
    this._snackBar.open('Successfully Remove!', 'Close', {
      duration: 2000,
    });
  }
  inputevent(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files instanceof FileList) {
        this.addphotos(event.target.files);
      }
    }
  }
  addphotos(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const r = files.item(i);
      if (r instanceof File) {
        this.photos.items.add(r);
      }
    }
  }
  upload(event: Event): void {
    this.DialogPhotoUpload &&
      ((event.target instanceof HTMLFormElement &&
        this.Form.HTML(event.target)
          .FilesAppend(this.photos.files, 'photo[]')
          .ReqReport()
          .subscribe({
            next: (event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Sent:
                  console.log('Request has been made!');
                  break;
                case HttpEventType.ResponseHeader:
                  this.progress = 0;
                  // this.photos = new DataTransfer();
                  console.log('Response header has been received!');
                  break;
                case HttpEventType.UploadProgress:
                  this.progress = Math.round(
                    (event.loaded / (event.total || 0)) * 100
                  );
                  console.log(`Uploaded! ${this.progress}%`);
                  break;
                case HttpEventType.Response:
                  this.DialogPhotoUpload?.service.upsertState(event.body)
                  this.close.emit(true);
                  this.photos = new DataTransfer();
                  console.log('Successfully Uploaded!', event.body);
              }
            },
          })) ||
        console.log('There is Error'));
    this.onNoClick();
  }
}
