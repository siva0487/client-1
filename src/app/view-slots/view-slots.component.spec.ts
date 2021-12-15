import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlotsComponent } from './view-slots.component';

describe('ViewSlotsComponent', () => {
  let component: ViewSlotsComponent;
  let fixture: ComponentFixture<ViewSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
