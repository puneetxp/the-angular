import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBase } from '../../../interface/form-base';
import { DynamicFormControlService } from '../../../service/Dynamic-form-control.service';
import { MatDialogActions } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { InputDynamicComponent } from './input-dynamic/input-dynamic.component';
import { JsonPipe, NgClass } from '@angular/common';
import { MatCard, MatCardActions } from '@angular/material/card';
import { Observable, Subscription } from 'rxjs';
@Component({
    selector: 'the-form-dynamic',
    templateUrl: './form-dynamic.component.html',
    providers: [DynamicFormControlService],
    imports: [MatCard, NgClass, ReactiveFormsModule, InputDynamicComponent, MatCardActions, MatButton, MatDialogActions]
})
export class FormDynamicComponent implements OnInit, OnChanges, OnDestroy {
  @Input() head = '';
  @Input() inputs: FormBase<any>[] = [];
  @Input() asyncInput: Observable<FormBase<any>[]> |null = null;
  @Input() isDialog = false;
  @Input() isSubmit = true;
  @Input() MatClass = '';
  @Input() valueReset = false;
  @Input() isLive = false;
  @Input() isSubmitCheck = true;
  @Input() rawLive = false;
  @Input() liveSingle !: string[];
  @Input() FillLeastOne !: string[][]
  @Input() isReset = false;
  @Input() removeValue = [null, ''];
  @Input() rowClass = 'form-row';
  @Input() formClass = 'py-2'
  @Input() Submit = 'Submit';
  @Input() SubmitClass = '';
  @Input() binding: Record<string, Record<string, (i: any) => any>> = {};
  @Output() listenRaw = new EventEmitter<any>();
  @Output() isVaild = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
  @Output() formOutput = new EventEmitter<any>();
  @Output() export = new EventEmitter<any>();
  @Output() listen = new EventEmitter<any>();
  form!: FormGroup;
  payLoad = '';
  private asyncInputSubscription: Subscription | undefined;

  constructor(private qcs: DynamicFormControlService,) { }
  ngOnInit() {
    this.MatClass = this.MatClass + ' p-2 ';
    this.isVaild.emit(false);
    this.buildForm();
    this.valueReset && this.form.reset();
    this.isLive && this.form.valueChanges.subscribe(() => {
      this.preValidation();
      this.preValidate && this.listen.emit(this.clean())
    })
    this.rawLive && this.form.valueChanges.subscribe(() => (this.preValidation(), this.listenRaw.emit(this.clean())))
    this.liveSingle && this.liveSingle.forEach(x => {
      this.form.controls[x].valueChanges.subscribe(i =>
        this.listen.emit({ [x]: i }))
    })
    Object.entries(this.binding).forEach(([key, target]) => {
      this.form.controls[key].valueChanges.subscribe(i => Object.entries(target).forEach(([t, any]) =>
        this.form.controls[t].setValue(any(i))))
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputs'] || changes['asyncInput']) {
      this.buildForm();
    }
  }
  ngOnDestroy() {
    this.asyncInputSubscription?.unsubscribe();
  }

  buildForm() {
    if (this.asyncInputSubscription) {
      this.asyncInputSubscription.unsubscribe();
    }
    if(this.asyncInput){
      this.asyncInputSubscription = this.asyncInput.subscribe(x => {
        this.inputs = x;
        this.form = this.qcs.toFormGroup(x);
      });
    }else{
      this.form = this.qcs.toFormGroup(this.inputs);
    }
    this.valueReset && this.form.reset();
    this.preValidation();
  }

  preValidate = true;
  preValidation() {
    this.FillLeastOne && (this.FillLeastOne.forEach(x => {
      if (!x.every(x => this.form.controls[x].value == null || this.form.controls[x].value == '')) {
        x.forEach(x => { this.form.controls[x].setErrors(null); this.form.controls[x].markAllAsTouched(); }); this.preValidate = false;
      } else {
        x.forEach(x => { this.form.controls[x].setErrors({ "error": true }); this.form.controls[x].markAllAsTouched(); });
      }
    }))
    this.preValidate = this.form.valid;
    this.isVaild.emit(this.preValidate);
  }
  onSubmit() {
    this.preValidation();
    this.preValidate && this.formOutput.emit(this.clean())
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
    this.close.emit(null);
  }
}
