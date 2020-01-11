import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfirmOrderItemComponent } from './report-confirm-order-item.component';

describe('ReportConfirmOrderItemComponent', () => {
  let component: ReportConfirmOrderItemComponent;
  let fixture: ComponentFixture<ReportConfirmOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConfirmOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConfirmOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
