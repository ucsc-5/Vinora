import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmConOrderElementComponent } from './stm-con-order-element.component';

describe('StmConOrderElementComponent', () => {
  let component: StmConOrderElementComponent;
  let fixture: ComponentFixture<StmConOrderElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmConOrderElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmConOrderElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
