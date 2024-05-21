import { Injectable } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { FormBase } from "../interface/form-base";

interface getme {
    key: string;
    value: string | number;
    lable?: string;
    type?: string;
    Validators?: ValidatorFn[];
    class?: string;
}

@Injectable({
    providedIn: "root",
})
export class DynamicFormService {
    // TODO: get from a remote source of question metadata
    getForm(data: any[], Validators: Record<string, ValidatorFn[]> = {}, value: Record<string, any> = {}): FormBase<any>[] {
        const inputs: FormBase<any>[] = [];
        data.forEach((element) => {
            const r = new FormBase(element);
            Validators[r.key] && r.Validators.push(...Validators[r.key]);
            value[r.key] && (r.value = value[r.key])
            inputs.push(r);
        });
        return inputs;
    }
    forms: FormBase<any>[] = [];
    getme(row: getme) {
        this.forms.push(new FormBase(row))
        return this;
    }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
