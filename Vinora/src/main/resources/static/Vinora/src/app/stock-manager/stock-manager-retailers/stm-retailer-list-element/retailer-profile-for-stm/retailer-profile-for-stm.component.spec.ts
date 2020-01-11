import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerProfileForSTMComponent } from './retailer-profile-for-stm.component';

describe('RetailerProfileForSTMComponent', () => {
  let component: RetailerProfileForSTMComponent;
  let fixture: ComponentFixture<RetailerProfileForSTMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerProfileForSTMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerProfileForSTMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
