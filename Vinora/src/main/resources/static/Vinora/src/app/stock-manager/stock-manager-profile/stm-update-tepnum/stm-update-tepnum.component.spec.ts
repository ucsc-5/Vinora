import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmUpdateTepnumComponent } from './stm-update-tepnum.component';

describe('StmUpdateTepnumComponent', () => {
  let component: StmUpdateTepnumComponent;
  let fixture: ComponentFixture<StmUpdateTepnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmUpdateTepnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmUpdateTepnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
