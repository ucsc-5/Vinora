import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegisteredRetailersComponent } from './company-registered-retailers.component';

describe('CompanyRegisteredRetailersComponent', () => {
  let component: CompanyRegisteredRetailersComponent;
  let fixture: ComponentFixture<CompanyRegisteredRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegisteredRetailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegisteredRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
