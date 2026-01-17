import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { WIDTH_BREAK } from '../../../../breakpoint';
import { FormBase } from '../../../../interface/form-base';
import { DialogService } from '../../../../service/Dialog.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput } from '@angular/material/chips';
import { Photo } from '../../../../interface/photo';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { option, SelectOptions } from '../../../../service/Form/Option';
import { AsyncPipe, NgSwitch, NgSwitchCase, NgClass, NgIf, NgFor } from '@angular/common';
import { InputSelectComponent } from '../input-select/input-select.component';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatSuffix, MatError, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { domain } from '../../../../breakpoint';
@Component({
    selector: 'the-input-dynamic',
    templateUrl: './input-dynamic.component.html',
    styleUrls: ['./input-dynamic.component.sass'],
    imports: [ReactiveFormsModule, NgSwitch, NgSwitchCase, MatInput, MatFormField, NgClass, MatLabel, MatIconButton, MatSuffix, MatIcon, NgIf, MatError, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, CdkTextareaAutosize, CdkDropList, NgFor, CdkDrag, MatCheckbox, MatSelect, MatOption, MatHint, MatSlideToggle, MatAutocompleteTrigger, MatAutocomplete, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput, InputSelectComponent, AsyncPipe]
})
export class InputDynamicComponent implements OnInit {
  constructor(public mydialog: DialogService, breakpoints: BreakpointObserver, private asyncpip: AsyncPipe) {
    this.isScreenSmall = breakpoints.observe(`(max-width: ${WIDTH_BREAK}px)`)
      .pipe(map((breakpoint) => breakpoint.matches));
  }
  public domain = domain;
  isScreenSmall: Observable<boolean>;
  @Input() input!: FormBase<any>;
  @Input() form!: FormGroup;
  @ViewChild('InputHTMLFront') InputHTMLFront!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  //autoOptions
  autoOptions: option[] = [];
  onAutochange(input: EventTarget | null): void {
    this.input.options && (
      this.autoOptions = input instanceof HTMLInputElement
        ? this.auto_filter(input.value as string)
        : this.input.options.slice()
    );
  }
  $onAutochange(input: EventTarget | null): void {
    this.input.optionsObservable && this.input.optionsObservable.options.subscribe({
      next: (i: Record<string, any>[]) => {
        this.autoOptions = input instanceof HTMLInputElement
          ? SelectOptions(i.filter((option: Record<string, any>) => option[this.input.optionsObservable!.value].toString().toLowerCase().includes(input.value.toLowerCase())), this.input.optionsObservable!.key, this.input.optionsObservable!.value)
          : SelectOptions(i, this.input.optionsObservable!.key, this.input.optionsObservable!.value);
      }
    })
  }
  AutodisplayFn(data: any): string {
    return data && data.value ? data.value : '';
  }
  selectoption$(): any {
    return this.asyncpip.transform(
      this.input.optionsObservable && this.input.optionsObservable.options.pipe(map((i: Record<string, any>[]) => i.find((j: Record<string, any>) => j[this.input.optionsObservable!.key] == this.input.value)?.[this.input.optionsObservable!.value]))
    )
  }
  selectoption() {
    return this.input.options && this.input.options.find(j => j.key == this.input.value)?.value || "";
  }
  selectmutlioption$(): any {
    return this.asyncpip.transform(
      this.input.optionsObservable && this.input.optionsObservable.options.pipe(map((i: Record<string, any>[]) => i.filter((j: Record<string, any>) => j[this.input.optionsObservable!.key] == this.input.value)))
    )
  }
  setForm(data: { key: string | number }): void {
    this.form.controls[this.input.key].setValue(data.key);
  }
  private auto_filter(name: string): option[] {
    const filterValue = name.toLowerCase();
    return this.input.options!.filter((option) => option.value.toString().toLowerCase().includes(filterValue));
  }
  //
  hide = true;
  //singlePhoto
  async photo_select(): Promise<Subscription> {
    const dialogRef = await this.mydialog.select_image({ directory: this.input.other.directory || "", service: this.input.other.service });
    return dialogRef.afterClosed().subscribe({
      next: (result: Photo | null) => {
        result && (this.input.other.photo = result, this.form.controls[this.input.key].setValue(result.id));
      }, error: (err: unknown) => {
        console.log(err)
      }
    });
  }
  //mutiphoto
  imagedrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.input.other.photos as Photo[], event.previousIndex, event.currentIndex);
    this.form.controls[this.input.key].setValue((this.input.other.photos as Photo[]).map((i: Photo) => i.id))
  }
  async photos_select(): Promise<Subscription> {
    if (this.input.other.photos.length > 0) {
      var dialogRef = await this.mydialog.select_images({ directory: "product", service: this.input.other.service, photo: this.input.other.photos });
    } else {
      var dialogRef = await this.mydialog.select_images({ directory: "product", service: this.input.other.service });
    }
    return dialogRef.afterClosed().subscribe({
      next: (result: Photo[] | null) => {
        result && (this.input.other.photos = result, this.form.controls[this.input.key].setValue(result.map((i: Photo) => i.id)));
      }, error: (err: unknown) => { console.log(err) }
    });
  }
  //multidata
  selectedOptions: option[] = [];
  keys: string[] = [];
  values: (string | number)[] = [];
  addselectedOptions(value: string): void {
    if (!this.selectedOptions.find((i) => i.value == value)) {
      const add = this.input.options!.find((i) => i.value == value);
      add && this.selectedOptions.push(add);
      this.setKeyValue();
    }
  }
  removeselectedOptions(value: string | number, key: "key" | "value" = "value"): void {
    this.selectedOptions = this.selectedOptions.filter((i) => i[key as keyof option] !== value);
    this.setKeyValue();
  }
  checkdata(): void {
    (this.input.value as (string | number)[]).forEach((element: string | number) => {
      const add = this.input.options!.find((i) => i.key == element);
      add && !this.selectedOptions.find((i) => i.key == add.key) && this.selectedOptions.push(add);
    })
    this.setKeyValue()
  }
  setKeyValue(): void {
    this.keys = this.selectedOptions.map(i => i.key);
    this.values = this.selectedOptions.map(i => i.value);
    this.InputHTMLFront && (this.InputHTMLFront.nativeElement.value = "");
    this.form.controls[this.input.key].setValue(this.keys);
  }
  matChipAdd(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.addselectedOptions(value);
    this.setKeyValue();
  }
  ngOnInit(): void {
    if (this.input.controlType == "datepicker") {
       this.form.controls[this.input.key].setValue(new Date(this.input.value));
    }
    this.input.options && (this.autoOptions = this.input.options);
    this.input.optionsObservable && this.$onAutochange(null);
    if (this.input.controlType == "chipselect") {
      this.selectedOptions.length == 0 && this.input.value && this.checkdata()
    }
  }
}

