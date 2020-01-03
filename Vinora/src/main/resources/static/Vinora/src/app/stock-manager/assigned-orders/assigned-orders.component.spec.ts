import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedOrdersComponent } from './assigned-orders.component';

describe('AssignedOrdersComponent', () => {
  let component: AssignedOrdersComponent;
  let fixture: ComponentFixture<AssignedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
