import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrdersSearchComponent } from './confirm-orders-search.component';

describe('ConfirmOrdersSearchComponent', () => {
  let component: ConfirmOrdersSearchComponent;
  let fixture: ComponentFixture<ConfirmOrdersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmOrdersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrdersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
