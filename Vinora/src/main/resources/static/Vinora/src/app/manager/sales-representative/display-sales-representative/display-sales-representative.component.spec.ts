import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySalesRepresentativeComponent } from './display-sales-representative.component';

describe('DisplaySalesRepresentativeComponent', () => {
  let component: DisplaySalesRepresentativeComponent;
  let fixture: ComponentFixture<DisplaySalesRepresentativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySalesRepresentativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySalesRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
