import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMainStockComponent } from './company-main-stock.component';

describe('CompanyMainStockComponent', () => {
  let component: CompanyMainStockComponent;
  let fixture: ComponentFixture<CompanyMainStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMainStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMainStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
