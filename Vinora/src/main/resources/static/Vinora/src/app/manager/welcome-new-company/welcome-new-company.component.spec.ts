import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeNewCompanyComponent } from './welcome-new-company.component';

describe('WelcomeNewCompanyComponent', () => {
  let component: WelcomeNewCompanyComponent;
  let fixture: ComponentFixture<WelcomeNewCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeNewCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeNewCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
