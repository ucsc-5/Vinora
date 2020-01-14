import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemDetailsComponent } from './update-item-details.component';

describe('UpdateItemDetailsComponent', () => {
  let component: UpdateItemDetailsComponent;
  let fixture: ComponentFixture<UpdateItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
