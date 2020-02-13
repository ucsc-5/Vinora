import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDeComElementComponent } from './reg-de-com-element.component';

describe('RegDeComElementComponent', () => {
  let component: RegDeComElementComponent;
  let fixture: ComponentFixture<RegDeComElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegDeComElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegDeComElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
