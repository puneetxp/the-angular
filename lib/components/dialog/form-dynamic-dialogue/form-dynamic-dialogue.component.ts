import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormControlService } from 'the-angular/lib/service/Dynamic-form-control.service';
@Component({
  selector: 'form-dynamic-dialogue',
  templateUrl: './form-dynamic-dialogue.component.html',
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

  constructor(
    public dialogRef: MatDialogRef<FormDynamicDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
  onCancel() {
    this.dialogRef.close(null);
  }
}
