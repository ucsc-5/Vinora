import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOrderElementComponent } from './current-order-element.component';

describe('CurrentOrderElementComponent', () => {
  let component: CurrentOrderElementComponent;
  let fixture: ComponentFixture<CurrentOrderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentOrderElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
