import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerDeliveredOrdersComponent } from './retailer-delivered-orders.component';

describe('RetailerDeliveredOrdersComponent', () => {
  let component: RetailerDeliveredOrdersComponent;
  let fixture: ComponentFixture<RetailerDeliveredOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerDeliveredOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerDeliveredOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
