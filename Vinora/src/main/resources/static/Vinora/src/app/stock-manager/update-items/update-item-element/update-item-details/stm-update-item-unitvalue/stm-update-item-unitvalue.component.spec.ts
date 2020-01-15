import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmUpdateItemUnitvalueComponent } from './stm-update-item-unitvalue.component';

describe('StmUpdateItemUnitvalueComponent', () => {
  let component: StmUpdateItemUnitvalueComponent;
  let fixture: ComponentFixture<StmUpdateItemUnitvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmUpdateItemUnitvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmUpdateItemUnitvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
