import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAutocompleteComponent } from './dropdown-autocomplete.component';

describe('DropdownAutocompleteComponent', () => {
  let component: DropdownAutocompleteComponent;
  let fixture: ComponentFixture<DropdownAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [DropdownAutocompleteComponent]
});
    fixture = TestBed.createComponent(DropdownAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
