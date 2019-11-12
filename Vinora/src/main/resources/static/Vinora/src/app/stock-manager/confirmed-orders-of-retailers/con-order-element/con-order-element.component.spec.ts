import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConOrderElementComponent } from './con-order-element.component';

describe('ConOrderElementComponent', () => {
  let component: ConOrderElementComponent;
  let fixture: ComponentFixture<ConOrderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConOrderElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConOrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
