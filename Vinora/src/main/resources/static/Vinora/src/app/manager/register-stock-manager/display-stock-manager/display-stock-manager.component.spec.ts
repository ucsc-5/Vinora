import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStockManagerComponent } from './display-stock-manager.component';

describe('DisplayStockManagerComponent', () => {
  let component: DisplayStockManagerComponent;
  let fixture: ComponentFixture<DisplayStockManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayStockManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStockManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
