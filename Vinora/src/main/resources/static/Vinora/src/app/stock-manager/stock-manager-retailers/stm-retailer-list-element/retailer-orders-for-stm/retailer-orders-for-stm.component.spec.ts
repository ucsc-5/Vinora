import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerOrdersForSTMComponent } from './retailer-orders-for-stm.component';

describe('RetailerOrdersForSTMComponent', () => {
  let component: RetailerOrdersForSTMComponent;
  let fixture: ComponentFixture<RetailerOrdersForSTMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerOrdersForSTMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerOrdersForSTMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
