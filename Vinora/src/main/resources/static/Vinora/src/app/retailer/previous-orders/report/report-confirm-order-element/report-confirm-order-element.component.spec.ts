import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfirmOrderElementComponent } from './report-confirm-order-element.component';

describe('ReportConfirmOrderElementComponent', () => {
  let component: ReportConfirmOrderElementComponent;
  let fixture: ComponentFixture<ReportConfirmOrderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConfirmOrderElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConfirmOrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
