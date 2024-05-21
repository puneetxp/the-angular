import { F } from "@angular/cdk/keycodes";
import { ValidatorFn, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
export class FormBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  order: number;
  controlType: string;
  type: string;
  options?: { key: string, value: string | number }[];
  optionsObservable?: { options: Observable<any[]>, key: string, value: string };
  class: string;
  Validators: ValidatorFn[];
  error: string;
  other: { options?: string[], photo?: any, photos?: any, service?: any, directory?: string, slider?: boolean };
  row: string;
  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string, value: string | number }[];
    optionsObservable?: { options: Observable<any[]>, key?: string, value?: string };
    class?: string;
    validator?: ValidatorFn[];
    error?: string,
    other?: { options?: string[], photo?: any, photos?: any, service?: any, directory?: string, slider?: boolean },
    row?: string
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || this.key.replace(this.key[0], this.key[0].toUpperCase());
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    options.options && (this.options = options.options);
    options.optionsObservable && (this.optionsObservable = { options: options.optionsObservable?.options || of([]), key: options.optionsObservable?.key || "id", value: options.optionsObservable?.value || "name" });
    this.class = options.class || '';
    this.row = options.row || '';
    this.Validators = options.validator || [];
    this.error = options.error || this.label + " is required";
    this.other = options.other || {};
  }
}
// export class FormBasex<T> {
//   value: T | undefined;
//   key: string;
//   label: string;
//   order: number;
//   controlType: string;
//   type: string;
//   // options?: { key: string, value: string | number }[];
//   optionsObservable?: { service: Observable<any[]>, key: string, value: string };
//   class: string;
//   Validators: ValidatorFn[];
//   error: string;
//   other: any;
//   row: string;
//   constructor(options: {
//     value?: T;
//     key?: string;
//     label?: string;
//     order?: number;
//     controlType?: string;
//     type?: string;
//     optionsObservable?: { service: any, key?: string, value?: string };
//     class?: string;
//     Validators?: ValidatorFn[];
//     error?: string,
//     other?: any,
//     row?: string
//   } = {}) {
//     this.value = options.value;
//     this.key = options.key || '';
//     this.label = options.label || this.key?.toUpperCase();
//     this.order = options.order === undefined ? 1 : options.order;
//     this.controlType = options.controlType || '';
//     this.type = options.type || '';
//     options.optionsObservable && (this.optionsObservable = { service: options.optionsObservable.service, key: options.optionsObservable?.key || "id", value: options.optionsObservable?.value || "name" });
//     this.class = options.class || '';
//     this.row = options.row || '';
//     this.Validators = options.Validators || [];
//     this.error = options.error || options.label + " is required";
//     this.other = options.other || {};
//   }
// }
export function setformbase(form: any[], addtional: Record<string, any>[] = [], required: boolean = false): FormBase<any>[] {
  const x = form.map((element) => setformbasesingle(element, addtional));
  return x;
}
export function setformbasesingle(element: any, addtional: Record<string, any>[] = [], required: boolean = false): FormBase<any> {
  addtional.forEach(i => {
    if (i[element.key] || i[element.key] === 0) {
      (typeof i[element.key] == "string" || typeof i[element.key] == "number") ? (element.value = i[element.key]) : (Object.assign(element, i[element.key]))
    }
  })
  required && (element.validator = [Validators.required])
  return new FormBase(element);
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
