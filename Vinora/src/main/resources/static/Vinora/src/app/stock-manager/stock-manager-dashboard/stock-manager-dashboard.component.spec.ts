import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManagerDashboardComponent } from './stock-manager-dashboard.component';

describe('StockManagerDashboardComponent', () => {
  let component: StockManagerDashboardComponent;
  let fixture: ComponentFixture<StockManagerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockManagerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
