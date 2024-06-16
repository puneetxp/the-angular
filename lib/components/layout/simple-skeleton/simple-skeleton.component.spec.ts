/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SimpleSkeletonComponent } from './simple-skeleton.component';

describe('SimpleSkeletonComponent', () => {
  let component: SimpleSkeletonComponent;
  let fixture: ComponentFixture<SimpleSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [SimpleSkeletonComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
