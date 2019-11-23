import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryWelcomeComponent } from './temporary-welcome.component';

describe('TemporaryWelcomeComponent', () => {
  let component: TemporaryWelcomeComponent;
  let fixture: ComponentFixture<TemporaryWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporaryWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
