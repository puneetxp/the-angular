import { TestBed } from '@angular/core/testing';
import { DynamicFormControlService } from './Dynamic-form-control.service';


describe('DynService', () => {
  let service: DynamicFormControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
