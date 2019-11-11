import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurOrderElementComponent } from './cur-order-element.component';

describe('CurOrderElementComponent', () => {
  let component: CurOrderElementComponent;
  let fixture: ComponentFixture<CurOrderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurOrderElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurOrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
