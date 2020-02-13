import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCompanyReportComponent } from './delivery-company-report.component';

describe('DeliveryCompanyReportComponent', () => {
  let component: DeliveryCompanyReportComponent;
  let fixture: ComponentFixture<DeliveryCompanyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCompanyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCompanyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
