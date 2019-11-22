import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderElementComponent } from './confirm-order-element.component';

describe('ConfirmOrderElementComponent', () => {
  let component: ConfirmOrderElementComponent;
  let fixture: ComponentFixture<ConfirmOrderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmOrderElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
