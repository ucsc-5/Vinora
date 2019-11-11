import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentItemElemetComponent } from './current-item-elemet.component';

describe('CurrentItemElemetComponent', () => {
  let component: CurrentItemElemetComponent;
  let fixture: ComponentFixture<CurrentItemElemetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentItemElemetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentItemElemetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
