import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBase } from '../interface/form-base';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormControlService {
    constructor() { }
    toFormGroup(form_inputs: FormBase<string>[]) {
        const group: any = {};
        form_inputs.forEach(input => {
            group[input.key] = new FormControl(input.value, input.Validators);
            input.valueChanges = new BehaviorSubject(input.value);
            input.valueChanges.subscribe(newValue => {
                group[input.key].setValue(newValue);
            });
        });
        return new FormGroup(group);
    }
}
