import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByItemElementComponent } from './report-by-item-element.component';

describe('ReportByItemElementComponent', () => {
  let component: ReportByItemElementComponent;
  let fixture: ComponentFixture<ReportByItemElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByItemElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByItemElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
