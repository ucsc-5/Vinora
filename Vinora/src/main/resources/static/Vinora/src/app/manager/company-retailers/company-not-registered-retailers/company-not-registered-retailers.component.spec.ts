import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNotRegisteredRetailersComponent } from './company-not-registered-retailers.component';

describe('CompanyNotRegisteredRetailersComponent', () => {
  let component: CompanyNotRegisteredRetailersComponent;
  let fixture: ComponentFixture<CompanyNotRegisteredRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNotRegisteredRetailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNotRegisteredRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
