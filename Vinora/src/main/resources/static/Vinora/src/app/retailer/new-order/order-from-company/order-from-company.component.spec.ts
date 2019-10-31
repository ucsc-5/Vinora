import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFromCompanyComponent } from './order-from-company.component';

describe('OrderFromCompanyComponent', () => {
  let component: OrderFromCompanyComponent;
  let fixture: ComponentFixture<OrderFromCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFromCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFromCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
