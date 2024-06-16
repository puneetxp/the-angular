import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyButtomFloatComponent } from './sticky-buttom-float.component';

describe('StickyButtomFloatComponent', () => {
  let component: StickyButtomFloatComponent;
  let fixture: ComponentFixture<StickyButtomFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StickyButtomFloatComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(StickyButtomFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
