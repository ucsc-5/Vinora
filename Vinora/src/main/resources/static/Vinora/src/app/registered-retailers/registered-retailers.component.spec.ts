import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredRetailersComponent } from './registered-retailers.component';

describe('RegisteredRetailersComponent', () => {
  let component: RegisteredRetailersComponent;
  let fixture: ComponentFixture<RegisteredRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredRetailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
