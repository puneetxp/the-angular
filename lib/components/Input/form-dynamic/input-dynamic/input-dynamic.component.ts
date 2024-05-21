import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { WIDTH_BREAK } from 'the-angular/lib/breakpoint';
import { FormBase } from 'the-angular/lib/interface/form-base';
import { DialogService } from 'the-angular/lib/service/Dialog.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Photo } from 'src/app/shared/Interface/Model/Photo';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { option, SelectOptions } from 'the-angular/lib/service/Form/Option';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'the-input-dynamic',
  templateUrl: './input-dynamic.component.html',
  styleUrls: ['./input-dynamic.component.sass']
})
export class InputDynamicComponent implements OnInit {
  constructor(public mydialog: DialogService, breakpoints: BreakpointObserver, private asyncpip: AsyncPipe) {
    this.isScreenSmall = breakpoints.observe(`(max-width: ${WIDTH_BREAK}px)`)
      .pipe(map((breakpoint) => breakpoint.matches));
  }
  isScreenSmall: Observable<boolean>;
  @Input() input!: FormBase<any>;
  @Input() form!: FormGroup;
  @ViewChild('InputHTMLFront') InputHTMLFront!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  //autoOptions
  autoOptions: option[] = [];
  onAutochange(input: EventTarget | null) {
    this.input.options && (
      this.autoOptions = input instanceof HTMLInputElement
        ? this.auto_filter(input.value as string)
        : this.input.options.slice()
    );
  }
  $onAutochange(input: EventTarget | null) {
    this.input.optionsObservable && this.input.optionsObservable.options.subscribe({
      next: i => {
        this.autoOptions = input instanceof HTMLInputElement
          ? SelectOptions(i.filter((option) => option[this.input.optionsObservable!.value].toString().toLowerCase().includes(input.value.toLowerCase())), this.input.optionsObservable!.key, this.input.optionsObservable!.value)
          : SelectOptions(i, this.input.optionsObservable!.key, this.input.optionsObservable!.value);
      }
    })
  }
  AutodisplayFn(data: any): string {
    return data && data.value ? data.value : '';
  }
  selectoption$() {
    return this.asyncpip.transform(
      this.input.optionsObservable && this.input.optionsObservable.options.pipe(map(i => i.find(j => j[this.input.optionsObservable!.key] == this.input.value)[this.input.optionsObservable!.value]))
    )
  }
  selectoption() {
    return this.input.options && this.input.options.find(j => j.key == this.input.value)?.value || "";
  }
  selectmutlioption$() {
    return this.asyncpip.transform(
      this.input.optionsObservable && this.input.optionsObservable.options.pipe(map(i => i.filter(j => j[this.input.optionsObservable!.key] == this.input.value)))
    )
  }
  setForm(data: any) {
    this.form.controls[this.input.key].setValue(data.key);
  }
  private auto_filter(name: string) {
    const filterValue = name.toLowerCase();
    return this.input.options!.filter((option) => option.value.toString().toLowerCase().includes(filterValue));
  }
  //
  hide = true;
  //singlePhoto
  photo_select() {
    const dialogRef = this.mydialog.select_image({ directory: this.input.other.directory || "", service: this.input.other.service });
    return dialogRef.afterClosed().subscribe({
      next: (result) => {
        result && (this.input.other.photos = result, this.form.controls[this.input.key].setValue(result.id));
      }, error: (err) => {
        console.log(err)
      }
    });
  }
  //mutiphoto
  imagedrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.input.other.photos, event.previousIndex, event.currentIndex);
    this.form.controls[this.input.key].setValue(this.input.other.photos.map((i: Photo) => i.id))
  }
  photos_select() {
    if (this.input.other.photos.length > 0) {
      var dialogRef = this.mydialog.select_images({ directory: "product", service: this.input.other.service, photo: this.input.other.photos });
    } else {
      var dialogRef = this.mydialog.select_images({ directory: "product", service: this.input.other.service });
    }
    return dialogRef.afterClosed().subscribe({
      next: (result) => {
        result && (this.input.other.photos = result, this.form.controls[this.input.key].setValue(result.map((i: Photo) => i.id)));
      }, error: (err) => { console.log(err) }
    });
  }
  //multidata
  selectedOptions: option[] = [];
  keys: string[] = [];
  values: (string | number)[] = [];
  addselectedOptions(value: string) {
    if (!this.selectedOptions.find(i => i.value == value)) {
      const add = this.input.options!.find((i) => i.value == value);
      add && this.selectedOptions.push(add);
      this.setKeyValue();
    }
  }
  removeselectedOptions(value: string | number, key: "key" | "value" = "value") {
    this.selectedOptions = this.selectedOptions.filter((i) => i[key] !== value);
    this.setKeyValue();
  }
  checkdata() {
    this.input.value.forEach((element: any) => {
      const add = this.input.options!.find((i) => i.key == element);
      add && !this.selectedOptions.find(i => i.key == add.key) && this.selectedOptions.push(add);
    })
    this.setKeyValue()
  }
  setKeyValue() {
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
    this.input.options && (this.autoOptions = this.input.options);
    this.input.optionsObservable && this.$onAutochange(null);
    if (this.input.controlType == "chipselect") {
      this.selectedOptions.length == 0 && this.input.value && this.checkdata()
    }
  }
}

