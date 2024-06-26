import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDynamicComponent } from './input-dynamic.component';

describe('InputDynamicComponent', () => {
  let component: InputDynamicComponent;
  let fixture: ComponentFixture<InputDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [InputDynamicComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(InputDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
