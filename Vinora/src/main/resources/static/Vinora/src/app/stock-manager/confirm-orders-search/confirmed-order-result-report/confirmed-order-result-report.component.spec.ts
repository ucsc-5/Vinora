import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedOrderResultReportComponent } from './confirmed-order-result-report.component';

describe('ConfirmedOrderResultReportComponent', () => {
  let component: ConfirmedOrderResultReportComponent;
  let fixture: ComponentFixture<ConfirmedOrderResultReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedOrderResultReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedOrderResultReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
