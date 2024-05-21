import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../components/dialog/confirm/confirm.component';
import { SelectImageComponent } from '../components/dialog/select-image/select-image.component';
import { SelectImagesComponent } from '../components/dialog/select-images/select-images.component';
import { DialogPhotosUpload } from '../interface/DialogPhotoUpload';
import { FormDynamicDialogueComponent } from '../components/dialog/form-dynamic-dialogue/form-dynamic-dialogue.component';
import { FormBase } from '../interface/form-base';
export interface additionalform {
  binding?: Record<string, any>,
  title?: string
}
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }
  confirm(head = 'Are You Sure?', body = `Please Comfirm the Action`): MatDialogRef<ConfirmComponent, any> {
    return this.dialog.open(ConfirmComponent, {
      data: { head: head, body: body }
    })
  }
  form(inputs: FormBase<any>[] = [], binding?: additionalform): MatDialogRef<FormDynamicDialogueComponent, any> {
    return this.dialog.open(FormDynamicDialogueComponent, {
      data: { inputs: inputs, binding: binding || {} },
    })
  }
  select_image(data: DialogPhotosUpload): MatDialogRef<SelectImageComponent, any> {
    return this.dialog.open(SelectImageComponent, {
      data: data,
    })
  }
  select_images(data: DialogPhotosUpload): MatDialogRef<SelectImagesComponent, any> {
    return this.dialog.open(SelectImagesComponent, {
      data: data,
    })
  }
}
