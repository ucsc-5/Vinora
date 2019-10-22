import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRepresentativeNavComponent } from './sales-representative-nav.component';

describe('SalesRepresentativeNavComponent', () => {
  let component: SalesRepresentativeNavComponent;
  let fixture: ComponentFixture<SalesRepresentativeNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRepresentativeNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRepresentativeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
