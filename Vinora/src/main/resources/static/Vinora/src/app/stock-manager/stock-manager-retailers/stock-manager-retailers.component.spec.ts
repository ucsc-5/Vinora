import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManagerRetailersComponent } from './stock-manager-retailers.component';

describe('StockManagerRetailersComponent', () => {
  let component: StockManagerRetailersComponent;
  let fixture: ComponentFixture<StockManagerRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockManagerRetailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockManagerRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
