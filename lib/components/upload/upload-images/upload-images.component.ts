import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { DialogPhotoUpload } from 'the-angular/lib/interface/DialogPhotoUpload';
import { FormDataService } from 'the-angular/lib/service/Form/FormData.service';
import { ImageService } from 'the-angular/lib/service/image.service';
import { LoginService } from 'the-angular/lib/service/login.service';

@Component({
  selector: 'the-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent {

  photos: DataTransfer = new DataTransfer();
  Array = Array;
  URL = URL;
  progress = 0;
  @Output() close = new EventEmitter<boolean>();
  @Output() uploadphoto = new EventEmitter<FormDataService>();
  @Input({ required: true }) DialogPhotoUpload: DialogPhotoUpload | undefined;
  @Input() diredit = false;
  // Submit Form
  constructor(
    private _snackBar: MatSnackBar,
    public Form: FormDataService,
    public http: HttpClient,
    public login: LoginService,
    public ImageService: ImageService,
    public store: Store
  ) { }

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
  }
}
