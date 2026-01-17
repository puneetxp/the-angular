import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { DynamicFormControlService } from '../../../service/Dynamic-form-control.service';

import { MatButton } from '@angular/material/button';
import { InputDynamicComponent } from '../../Input/form-dynamic/input-dynamic/input-dynamic.component';
import { NgClass } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { additionalform } from '../../../service/Dialog.service';
import { FormBase } from '../../../interface/form-base';

@Component({
    selector: 'form-dynamic-dialogue',
    templateUrl: './form-dynamic-dialogue.component.html',
    imports: [
    MatCard,
    NgClass,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    InputDynamicComponent,
    MatButton,
    MatDialogActions
]
})
export class FormDynamicDialogueComponent implements OnInit {
  binding: Record<string, Record<string, (i: any) => any>> = {};
  @Input() head = '';
  MatClass = 'w-full xs:mx-auto xs:w-72 lg:w-96';
  @Input() isSubmitCheck = true;
  @Input() FillLeastOne !: string[][]
  @Input() isReset = false;
  @Input() removeValue = [null, ""];
  @Input() rowClass = 'form-row';
  @Input() formClass = 'py-2'
  @Input() Submit = 'Submit';
  @Input() SubmitClass = "";
  form!: FormGroup;
  payLoad = '';

  //readonly dialogRef = inject(MatDialogRef<FormDynamicDialogueComponent>);
  //readonly data = inject<{ inputs: FormBase<any>[], binding: additionalform }>(MAT_DIALOG_DATA);

  constructor(
    public dialogRef: MatDialogRef<FormDynamicDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inputs: FormBase<any>[], binding: additionalform },
    private qcs: DynamicFormControlService
  ) {
  }
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.data.inputs);
    Object.entries(this.binding).forEach(([key, target]) => {
      this.form.controls[key].valueChanges.subscribe(i => Object.entries(target).forEach(([t, any]) =>
        this.form.controls[t].setValue(any(i))))
    })
  }
  preValidate = true;
  preValidation() {
    this.FillLeastOne && (this.FillLeastOne.forEach(x => {
      if (!x.every(x => this.form.controls[x].value == null || this.form.controls[x].value == "")) {
        x.forEach(x => { this.form.controls[x].setErrors(null); this.form.controls[x].markAllAsTouched(); }); this.preValidate = false;
      } else {
        x.forEach(x => { this.form.controls[x].setErrors({ "error": true }); this.form.controls[x].markAllAsTouched(); });
      }
    }))
    this.preValidate = this.form.valid;
  }
  onSubmit() {
    this.preValidation();
    this.preValidate && this.dialogRef.close(this.clean())
  }
  clean() {
    const x = this.form.value;
    if (x.enable !== undefined) {
      x.enable ? (x.enable = 1) : (x.enable = 0);
    }
    Object.entries(x).forEach(([key, value]) => {
      this.removeValue.forEach(i => { i === value && delete x[key] })
    });
    return x;
  }
  onNoClick(): void {
    this.dialogRef.close(null);
  }
  onCancel() {
    this.dialogRef.close(null);
  }
}
