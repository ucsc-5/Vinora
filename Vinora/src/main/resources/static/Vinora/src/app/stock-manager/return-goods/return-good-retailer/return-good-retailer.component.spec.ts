import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnGoodRetailerComponent } from './return-good-retailer.component';

describe('ReturnGoodRetailerComponent', () => {
  let component: ReturnGoodRetailerComponent;
  let fixture: ComponentFixture<ReturnGoodRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnGoodRetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnGoodRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
