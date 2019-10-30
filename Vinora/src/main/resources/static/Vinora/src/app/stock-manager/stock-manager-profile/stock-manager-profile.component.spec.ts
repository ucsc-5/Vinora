import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManagerProfileComponent } from './stock-manager-profile.component';

describe('StockManagerProfileComponent', () => {
  let component: StockManagerProfileComponent;
  let fixture: ComponentFixture<StockManagerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockManagerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockManagerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
