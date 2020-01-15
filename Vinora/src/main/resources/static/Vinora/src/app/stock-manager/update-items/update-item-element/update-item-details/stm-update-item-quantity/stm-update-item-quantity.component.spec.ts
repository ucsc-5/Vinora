import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmUpdateItemQuantityComponent } from './stm-update-item-quantity.component';

describe('StmUpdateItemQuantityComponent', () => {
  let component: StmUpdateItemQuantityComponent;
  let fixture: ComponentFixture<StmUpdateItemQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmUpdateItemQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmUpdateItemQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
