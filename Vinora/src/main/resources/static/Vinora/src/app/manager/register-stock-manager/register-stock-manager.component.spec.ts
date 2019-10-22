import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStockManagerComponent } from './register-stock-manager.component';

describe('RegisterStockManagerComponent', () => {
  let component: RegisterStockManagerComponent;
  let fixture: ComponentFixture<RegisterStockManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStockManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStockManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
