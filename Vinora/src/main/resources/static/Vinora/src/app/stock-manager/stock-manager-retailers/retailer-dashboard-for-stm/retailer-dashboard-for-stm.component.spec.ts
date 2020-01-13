import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerDashboardForSTMComponent } from './retailer-dashboard-for-stm.component';

describe('RetailerDashboardForSTMComponent', () => {
  let component: RetailerDashboardForSTMComponent;
  let fixture: ComponentFixture<RetailerDashboardForSTMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerDashboardForSTMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerDashboardForSTMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
