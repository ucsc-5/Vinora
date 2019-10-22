import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSalesRepresentativeComponent } from './register-sales-representative.component';

describe('RegisterSalesRepresentativeComponent', () => {
  let component: RegisterSalesRepresentativeComponent;
  let fixture: ComponentFixture<RegisterSalesRepresentativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSalesRepresentativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSalesRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
