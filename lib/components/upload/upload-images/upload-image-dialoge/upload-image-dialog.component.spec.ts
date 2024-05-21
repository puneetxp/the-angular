import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageDialog } from './upload-image-dialog.component';

describe('UploadImageDialog', () => {
  let component: UploadImageDialog;
  let fixture: ComponentFixture<UploadImageDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImageDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImageDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
