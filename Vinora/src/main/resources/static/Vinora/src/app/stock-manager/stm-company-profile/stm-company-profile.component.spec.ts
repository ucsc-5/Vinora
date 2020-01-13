import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmCompanyProfileComponent } from './stm-company-profile.component';

describe('StmCompanyProfileComponent', () => {
  let component: StmCompanyProfileComponent;
  let fixture: ComponentFixture<StmCompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmCompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
