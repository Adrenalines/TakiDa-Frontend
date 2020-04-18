import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastOrderComponent } from './fast-order.component';

describe('FastOrderComponent', () => {
  let component: FastOrderComponent;
  let fixture: ComponentFixture<FastOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
