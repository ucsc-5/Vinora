import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByItemComponent } from './report-by-item.component';

describe('ReportByItemComponent', () => {
  let component: ReportByItemComponent;
  let fixture: ComponentFixture<ReportByItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
