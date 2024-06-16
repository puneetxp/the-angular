import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBase } from 'the-angular/lib/interface/form-base';
import { MatOption } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'the-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.sass'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatOption]
})
export class InputSelectComponent implements OnInit {
  @Input({ required: true }) input!: FormBase<string>;
  @Input({ required: true }) form!: FormGroup;
  filteredOptions: string[] =[];
  ngOnInit(){
    this.autocomplete(null);
  }
  autocomplete(EventTarget :EventTarget|null){
      this.filteredOptions = EventTarget instanceof HTMLInputElement
        ? this._filter(EventTarget.value as string)
        : this.input.other.options?.slice() || []
  }
  private _filter(value: string): string[] {
    this.form.controls[this.input.key].setValue(value);
    const filterValue = value.toLowerCase();
    return this.input.other.options?.filter(option => option.toLowerCase().includes(filterValue)) || [];
  }
}
