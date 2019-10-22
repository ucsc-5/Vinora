import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRepresentativeComponent } from './sales-representative.component';

describe('SalesRepresentativeComponent', () => {
  let component: SalesRepresentativeComponent;
  let fixture: ComponentFixture<SalesRepresentativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRepresentativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
