import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDynamicDialogueComponent } from './form-dynamic-dialogue.component';

describe('FormDynamicDialogueComponents', () => {
  let component: FormDynamicDialogueComponent;
  let fixture: ComponentFixture<FormDynamicDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDynamicDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDynamicDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
