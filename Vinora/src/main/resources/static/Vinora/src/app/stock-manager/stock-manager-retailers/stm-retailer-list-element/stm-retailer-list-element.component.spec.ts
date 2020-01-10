import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StmRetailerListElementComponent } from './stm-retailer-list-element.component';

describe('StmRetailerListElementComponent', () => {
  let component: StmRetailerListElementComponent;
  let fixture: ComponentFixture<StmRetailerListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StmRetailerListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StmRetailerListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
