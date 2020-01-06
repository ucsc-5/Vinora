import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiignedOrderDetailsComponent } from './asiigned-order-details.component';

describe('AsiignedOrderDetailsComponent', () => {
  let component: AsiignedOrderDetailsComponent;
  let fixture: ComponentFixture<AsiignedOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsiignedOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsiignedOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
