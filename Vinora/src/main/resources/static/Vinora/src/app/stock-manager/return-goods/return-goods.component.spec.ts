import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnGoodsComponent } from './return-goods.component';

describe('ReturnGoodsComponent', () => {
  let component: ReturnGoodsComponent;
  let fixture: ComponentFixture<ReturnGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
