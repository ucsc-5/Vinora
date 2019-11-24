import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmItemPopupComponent } from './confirm-item-popup.component';

describe('ConfirmItemPopupComponent', () => {
  let component: ConfirmItemPopupComponent;
  let fixture: ComponentFixture<ConfirmItemPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmItemPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
