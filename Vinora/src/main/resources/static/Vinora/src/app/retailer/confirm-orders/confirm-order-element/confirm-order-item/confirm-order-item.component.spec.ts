import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderItemComponent } from './confirm-order-item.component';

describe('ConfirmOrderItemComponent', () => {
  let component: ConfirmOrderItemComponent;
  let fixture: ComponentFixture<ConfirmOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
