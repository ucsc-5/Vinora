import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmCrtOrderItemElemetComponent } from './stm-crt-order-item-elemet.component';

describe('StmCrtOrderItemElemetComponent', () => {
  let component: StmCrtOrderItemElemetComponent;
  let fixture: ComponentFixture<StmCrtOrderItemElemetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmCrtOrderItemElemetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmCrtOrderItemElemetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
