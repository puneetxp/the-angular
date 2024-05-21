import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'the-dropdown-autocomplete',
  templateUrl: './dropdown-autocomplete.component.html',
  styleUrls: ['./dropdown-autocomplete.component.scss']
})
export class DropdownAutocompleteComponent implements OnInit {
  filter!: string;
  @Input() label: string = "Label"
  @Input() option: any[] = [];
  @Input() input!: any;
  @Input() key: string = "id"
  @Input() value: string = "name"
  @Output() out = new EventEmitter<any>();
  setForm(data: any) {
    this.out.emit(data);
  }
  check(data: any) {
    const option = this.option.find((m: any) => m[this.value] == data.target.value)
    option && this.out.emit({ key: option[this.key], value: option[this.value] })
  }
  AutodisplayFn(data: any): string {
    return data && data.value ? data.value : '';
  }
  ngOnInit(): void {
    this.filter = this.input[this.value];
  }
}
