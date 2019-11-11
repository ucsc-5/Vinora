import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOrdersFromRetailersComponent } from './current-orders-from-retailers.component';

describe('CurrentOrdersFromRetailersComponent', () => {
  let component: CurrentOrdersFromRetailersComponent;
  let fixture: ComponentFixture<CurrentOrdersFromRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentOrdersFromRetailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOrdersFromRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
