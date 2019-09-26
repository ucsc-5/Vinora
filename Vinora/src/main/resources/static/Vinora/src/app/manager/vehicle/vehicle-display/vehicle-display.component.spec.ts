import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDisplayComponent } from './vehicle-display.component';

describe('VehicleDisplayComponent', () => {
  let component: VehicleDisplayComponent;
  let fixture: ComponentFixture<VehicleDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
