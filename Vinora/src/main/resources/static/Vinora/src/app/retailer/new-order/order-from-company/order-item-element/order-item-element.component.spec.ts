import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemElementComponent } from './order-item-element.component';

describe('OrderItemElementComponent', () => {
  let component: OrderItemElementComponent;
  let fixture: ComponentFixture<OrderItemElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
