import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmComSalerepsComponent } from './stm-com-salereps.component';

describe('StmComSalerepsComponent', () => {
  let component: StmComSalerepsComponent;
  let fixture: ComponentFixture<StmComSalerepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmComSalerepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmComSalerepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
