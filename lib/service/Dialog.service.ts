import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../components/dialog/confirm/confirm.component';
import { SelectImageComponent } from '../components/dialog/select-image/select-image.component';
import { SelectImagesComponent } from '../components/dialog/select-images/select-images.component';
import { DialogPhotosUpload } from '../interface/DialogPhotoUpload';
import { FormDynamicDialogueComponent } from '../components/dialog/form-dynamic-dialogue/form-dynamic-dialogue.component';
import { FormBase } from '../interface/form-base';
import { LoginDialogComponent } from '../components/dialog/login/login.component';
import { async } from 'rxjs';
export interface additionalform {
  binding?: Record<string, any>,
  title?: string
}
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  readonly dialog = inject(MatDialog);
  async confirm(head = 'Are You Sure?', body = `Please Comfirm the Action`): Promise<MatDialogRef<ConfirmComponent, any>> {
    return import('../components/dialog/confirm/confirm.component').then(r => this.dialog.open(r.ConfirmComponent, {
      data: { head: head, body: body }
    }))
  }
  async form(inputs: FormBase<any>[], binding?: additionalform): Promise<MatDialogRef<FormDynamicDialogueComponent, any>> {
    return import('../components/dialog/form-dynamic-dialogue/form-dynamic-dialogue.component').then(r => this.dialog.open(r.FormDynamicDialogueComponent, {
      data: { inputs: inputs, binding: binding || {} },
    }));
  }
  async select_image(data: DialogPhotosUpload): Promise<MatDialogRef<SelectImageComponent, any>> {
    return import('../components/dialog/select-image/select-image.component').then(r => this.dialog.open(r.SelectImageComponent, {
      data: data,
    }));
  }
  async select_images(data: DialogPhotosUpload): Promise<MatDialogRef<SelectImagesComponent, any>> {
    return import('../components/dialog/select-images/select-images.component').then(r => this.dialog.open(r.SelectImagesComponent, {
      data: data,
    }));
  }
  async login(): Promise<MatDialogRef<LoginDialogComponent, any>> {
    return import('../components/dialog/login/login.component').then(r => this.dialog.open(r.LoginDialogComponent, { data: null }));
  }
}
