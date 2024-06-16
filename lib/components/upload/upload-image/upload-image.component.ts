import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogService } from "the-angular/lib/service/Dialog.service";
import { FormDataService } from "the-angular/lib/service/Form/FormData.service";
import { ImageService } from "the-angular/lib/service/image.service";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { FileDragNDropDirective } from "../../directive/file-drag-drop";
import { MatInput } from "@angular/material/input";
import { NgClass, NgFor, KeyValuePipe } from "@angular/common";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


@Component({
    selector: 'the-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, MatFormField, NgClass, MatLabel, MatInput, NgFor, FileDragNDropDirective, MatButton, MatIcon, KeyValuePipe]
})
export class UploadImageComponent {

  photos: DataTransfer = new DataTransfer();
  @Input() action = "/api/isuper/photo";
  @Input() accept = "image/*";
  @Input() additional: Record<string, string | number> = {}
  @Input() directory = "";
  @Input() diredit = false;
  @Input() SubmitTxt = "Proceed";
  @Input() fileuploadname = "Photo[]"
  @Output() onsubmit = new EventEmitter<FormDataService>();
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  Array = Array;
  URL = URL;
  progress!: number;
  // Submit Form
  constructor(
    private _snackBar: MatSnackBar,
    public mydialog: DialogService,
    public Image_Service: ImageService,
    public Form: FormDataService,
    public http: HttpClient,
  ) {
  }

  dragevent(event: DragEvent) {
    if (event.dataTransfer instanceof DataTransfer) {
      this.addphotos(event.dataTransfer.files);
    }
  }

  removeimage(index: number) {
    this.photos.items.remove(index);
    this._snackBar.open("Successfully Remove!", "Close", {
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
    this.photos.items.clear();
    for (let i = 0; i < files.length; i++) {
      const r = files.item(i);
      if (r instanceof File) {
        this.photos.items.add(r);
      }
    }
  }
  fileshow() {
    this.input.nativeElement.setAttribute("accept", this.accept);
    this.input.nativeElement.click();
  }
  reset() {
    this.photos.items.clear();
  }
  upload(event: Event) {
    if (event.target instanceof HTMLFormElement) {
      this.onsubmit.emit(this.Form.HTML(event.target).FilesAppend(this.photos.files, this.fileuploadname));
      this.reset();
    } else {
      console.log("there is error");
    }
  }
}
