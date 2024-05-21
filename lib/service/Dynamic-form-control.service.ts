import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBase } from '../interface/form-base';
@Injectable({
    providedIn: 'root'
})
export class DynamicFormControlService {
    constructor() { }
    toFormGroup(form_inputs: FormBase<string>[]) {
        const group: any = {};
        form_inputs.forEach(input => {
            group[input.key] = new FormControl(input.value, input.Validators)
        });
        return new FormGroup(group);
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/