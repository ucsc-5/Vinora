import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmSalerepDetailsComponent } from './stm-salerep-details.component';

describe('StmSalerepDetailsComponent', () => {
  let component: StmSalerepDetailsComponent;
  let fixture: ComponentFixture<StmSalerepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmSalerepDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmSalerepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
