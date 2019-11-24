import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsPopupComponent } from './item-details-popup.component';

describe('ItemDetailsPopupComponent', () => {
  let component: ItemDetailsPopupComponent;
  let fixture: ComponentFixture<ItemDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
