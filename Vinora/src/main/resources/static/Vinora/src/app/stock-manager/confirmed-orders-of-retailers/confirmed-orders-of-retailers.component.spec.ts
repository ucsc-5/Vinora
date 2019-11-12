import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedOrdersOfRetailersComponent } from './confirmed-orders-of-retailers.component';

describe('ConfirmedOrdersOfRetailersComponent', () => {
  let component: ConfirmedOrdersOfRetailersComponent;
  let fixture: ComponentFixture<ConfirmedOrdersOfRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedOrdersOfRetailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedOrdersOfRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
